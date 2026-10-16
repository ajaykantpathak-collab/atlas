# Atlas — Kubernetes deployment

Production orchestration manifests. Works on any managed cluster
(EKS, GKE, AKS, DigitalOcean, k3s) or bare-metal k8s.

## Layout

| File | Contents |
|---|---|
| `namespace.yaml` | `atlas` namespace |
| `secrets.example.yaml` | Secret template — **never commit real values** |
| `data.yaml` | Postgres, Redis, Neo4j, ClickHouse (StatefulSets + Services) |
| `pvcs.yaml` | Read-only corpus volumes (cbse-data, organized, content, enrichment) |
| `app.yaml` | db-init Job, backend Deployment + HPA, frontend, Ingress |

## Deploy

```bash
kubectl apply -f namespace.yaml
# 1. Copy secrets.example.yaml → secrets.yaml, fill real values
kubectl apply -f secrets.yaml
kubectl apply -f data.yaml pvcs.yaml
# 2. Wait for data tier
kubectl -n atlas wait --for=condition=ready pod -l app=postgres --timeout=120s
# 3. Build + push images, replace REGISTRY/atlas-*:TAG in app.yaml
kubectl apply -f app.yaml
kubectl -n atlas rollout status deploy/backend
```

## Notes for real production

- **Managed services beat self-hosted statefulsets.** If you use RDS /
  ElastiCache / Neo4j Aura / ClickHouse Cloud, delete `data.yaml` and
  point `atlas-env` + `atlas-secrets` at the managed endpoints.
- **Corpus volumes** — `ReadOnlyMany` PVCs work on EFS/ Filestore / Azure
  Files. For S3-backed corpus, swap the PVCs for an initContainer that
  syncs objects to `emptyDir` per pod.
- **db-init is a Job** — re-run on schema changes (`kubectl delete job
  db-init && kubectl apply -f app.yaml`).
- **Ingress** — assumes ingress-nginx + cert-manager. Add `tls:` block +
  `cert-manager.io/cluster-issuer` annotation for HTTPS.
- **Scaling** — backend HPA: 2→8 pods on CPU 70%. All session/mastery/
  intelligence state is in Postgres/Redis/ClickHouse, so pods are
  interchangeable.
- **Health** — `/health` on :8000 for backend probes, `/` on :3000 for
  frontend.
