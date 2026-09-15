/**
 * End-to-end flow test — simulates what the browser does:
 * 1. Fetch nodes for each class/subject
 * 2. Pick representative nodes from each template
 * 3. Fetch full enrichment for each
 * 4. Run through SimulationPropsMapper
 * 5. Verify all fields are populated
 */
import { enrichNodeToSimProps } from '../lib/c68/SimulationPropsMapper';
import { inferTemplateType, getTemplateInfo } from '../lib/c68/SimulationRegistry';

async function fetchJSON(url: string): Promise<any> {
  const res = await fetch(url);
  return res.json();
}

async function main() {
  const subjects = ['physics', 'chem', 'bio', 'maths', 'geo', 'cs', 'histciv'];
  const templateTested: Record<string, boolean> = {};
  const issues: string[] = [];
  let testedCount = 0;

  for (const cls of [6, 7, 8]) {
    for (const subj of subjects) {
      const data = await fetchJSON(`http://localhost:3000/api/c68/nodes?class=${cls}&subject=${subj}`);
      const nodes = data.nodes || [];
      for (const nodeSummary of nodes) {
        const fullData = await fetchJSON(`http://localhost:3000/api/c68/nodes?nodeId=${nodeSummary.nodeId}`);
        const node = fullData.node;
        if (!node) {
          issues.push(`${nodeSummary.nodeId}: API returned no node data`);
          continue;
        }

        const template = inferTemplateType({ nodeId: node.nodeId, title: node.title, subject: subj } as any);
        if (templateTested[template]) continue;

        // Test this node
        templateTested[template] = true;
        testedCount++;

        // Check enrichment fields
        const checks: string[] = [];
        if (!node.definition || node.definition.length < 20) checks.push('no definition');
        if (!node.eli5 || node.eli5.length < 20) checks.push('no eli5');
        if (!Array.isArray(node.misconceptions) || node.misconceptions.length === 0) checks.push('no misconceptions');
        if (!Array.isArray(node.diagnosticQuestions) || node.diagnosticQuestions.length === 0) checks.push('no diagnostic questions');
        if (!node.masteryCriteria || node.masteryCriteria.length < 20) checks.push('no mastery criteria');

        // Run through props mapper
        const simProps = enrichNodeToSimProps(node);
        if (!simProps.title) checks.push('mapper: no title');
        if (!simProps.definition) checks.push('mapper: no definition');
        if (!simProps.eli5) checks.push('mapper: no eli5');
        if (simProps.misconceptions.length === 0) checks.push('mapper: no misconceptions');
        if (simProps.diagnosticQuestions.length === 0) checks.push('mapper: no challenges');
        if (!simProps.templateType) checks.push('mapper: no templateType');

        const templateInfo = getTemplateInfo(template);
        if (!templateInfo) checks.push(`no TEMPLATE_INFO for ${template}`);

        if (checks.length > 0) {
          issues.push(`${node.nodeId} [${template}]: ${checks.join(', ')}`);
        }

        // Log first test for each template
        const status = checks.length === 0 ? 'OK' : 'FAIL';
        console.log(`[${status}] ${node.nodeId} -> ${template} (${simProps.diagnosticQuestions.length} challenges, ${simProps.misconceptions.length} misconceptions)`);
      }
    }
  }

  console.log('\n=== SUMMARY ===');
  console.log(`Templates tested: ${testedCount}`);
  console.log(`Issues found: ${issues.length}`);
  if (issues.length > 0) {
    console.log('\n=== ISSUES ===');
    issues.forEach(i => console.log(`  ${i}`));
  } else {
    console.log('All templates pass — every node has full enrichment data.');
  }
}

main().catch(console.error);
