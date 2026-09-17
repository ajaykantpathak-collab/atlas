import { redirect } from 'next/navigation'

export default function ExamSimulatorAttemptRedirect({
  params,
}: {
  params: { examId: string }
}) {
  redirect(`/exam/${params.examId}`)
}
