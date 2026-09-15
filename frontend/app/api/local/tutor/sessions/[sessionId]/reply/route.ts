import { NextResponse } from 'next/server'
import { getEnrichmentNode } from '@/lib/markerParser'
import { sessions } from '@/lib/tutorSessions'

export async function POST(
  request: Request,
  { params }: { params: { sessionId: string } }
) {
  try {
    const { sessionId } = params
    const body = await request.json()
    const message = body.message?.trim()

    if (!message) {
      return NextResponse.json({ error: 'message is required' }, { status: 400 })
    }

    const session = sessions.get(sessionId)
    if (!session) {
      return NextResponse.json({ error: 'Session not found' }, { status: 404 })
    }

    // Store user message
    session.messages.push({ role: 'user', content: message, type: 'text' })

    // Get the enrichment node
    const node = getEnrichmentNode(session.nodeId)

    // Generate a reply based on the message
    const reply = generateReply(message, node, session)

    // Store tutor reply
    session.messages.push({
      role: 'tutor',
      content: reply.content,
      type: reply.type,
      diagnostic_state: reply.diagnostic_state || null,
    })

    return NextResponse.json({
      reply: {
        content: reply.content,
        type: reply.type,
        diagnostic_state: reply.diagnostic_state || null,
      },
      source: 'local',
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to process reply', detail: String(error) },
      { status: 500 }
    )
  }
}

function generateReply(message: string, node: any, session: any): {
  content: string
  type: string
  diagnostic_state?: any
} {
  const msg = message.toLowerCase()

  // ─── Command handling ──────────────────────────────────────

  if (msg === 'walkthrough' || msg.includes('walk me through') || msg.includes('walkthrough')) {
    if (node?.text_walkthrough) {
      return {
        content: `📖 **Walkthrough: ${node.title}**\n\n${node.text_walkthrough}`,
        type: 'walkthrough',
        diagnostic_state: { phase: 'teach' },
      }
    }
    return { content: 'Walkthrough content is not available for this node.', type: 'text' }
  }

  if (msg === 'simplify' || msg === 'eli5' || msg.includes('explain simply') || msg.includes('simple')) {
    if (node?.eli5) {
      return {
        content: `💡 **Simple Explanation (ELI5)**\n\n${node.eli5}`,
        type: 'eli5',
        diagnostic_state: { phase: 'teach' },
      }
    }
    return { content: 'A simplified explanation is not available for this node.', type: 'text' }
  }

  if (msg === 'mistakes' || msg.includes('common mistake') || msg.includes('misconception')) {
    if (node?.common_misconception) {
      return {
        content: `⚠️ **Common Mistakes to Avoid**\n\n${node.common_misconception}`,
        type: 'misconception',
        diagnostic_state: { phase: 'teach' },
      }
    }
    return { content: 'Common misconception data is not available for this node.', type: 'text' }
  }

  if (msg === 'definition' || msg.includes('what is') || msg.includes('define')) {
    if (node?.definition) {
      return {
        content: `📋 **Definition: ${node.title}**\n\n${node.definition}`,
        type: 'definition',
        diagnostic_state: { phase: 'teach' },
      }
    }
    return { content: 'Definition content is not available for this node.', type: 'text' }
  }

  if (msg === 'test me' || msg === 'quiz' || msg.includes('test my')) {
    if (node?.diagnostic_question) {
      // Extract the first question from the diagnostic block
      const questions = node.diagnostic_question.split(/Q\d+/).filter((s: string) => s.trim().length > 0)
      const firstQ = questions[0]?.trim() || node.diagnostic_question.slice(0, 500)
      return {
        content: `🎯 **Let's test your understanding!**\n\n${firstQ}\n\nType your answer, or type "show answer" to see the solution.`,
        type: 'diagnostic',
        diagnostic_state: {
          phase: 'diagnostic',
          current_question: 1,
          total_questions: Math.min(questions.length, 5),
          answered: 0,
          failed: [],
        },
      }
    }
    return { content: 'Diagnostic questions are not available for this node.', type: 'text' }
  }

  if (msg === 'show answer' || msg === 'show answers') {
    if (node?.diagnostic_question) {
      return {
        content: `📝 **Answer Key**\n\n${node.diagnostic_question}`,
        type: 'diagnostic-answer',
        diagnostic_state: { phase: 'teach' },
      }
    }
    return { content: 'Answer key is not available.', type: 'text' }
  }

  if (msg === 'hint' || msg === 'help') {
    if (node?.eli5) {
      // Give a short hint from ELI5
      const hint = node.eli5.split('.')[0] + '.'
      return {
        content: `💡 **Hint:** ${hint}\n\nThink about this carefully and try again!`,
        type: 'hint',
        diagnostic_state: session.phase ? { phase: session.phase } : null,
      }
    }
    return { content: 'Hint: Re-read the definition carefully and try again!', type: 'hint' }
  }

  if (msg === 'stop' || msg === 'end' || msg === 'quit') {
    return {
      content: `Great session! You can start a new topic anytime. 🎉`,
      type: 'text',
      diagnostic_state: { phase: 'mastered' },
    }
  }

  // ─── Default: try to answer from enrichment content ────────

  // If the node has a definition, and the question seems related, give the definition
  if (node?.definition) {
    // Check if message contains keywords from the title
    const titleWords = node.title.toLowerCase().split(/\s+/).filter((w: string) => w.length > 3)
    const matches = titleWords.filter((w: string) => msg.includes(w))

    if (matches.length > 0 || msg.includes('explain') || msg.includes('tell me about') || msg.includes('how')) {
      // Give a contextual answer using definition + ELI5
      const eli5Part = node.eli5 ? `\n\n💡 **In simple terms:** ${node.eli5}` : ''
      return {
        content: `Great question! Let me explain **${node.title}**:\n\n${node.definition}${eli5Part}\n\nWould you like me to walk you through it step by step? Just type "walkthrough"!`,
        type: 'teach',
        diagnostic_state: { phase: 'teach' },
      }
    }
  }

  // ─── Fallback ──────────────────────────────────────────────

  const suggestions = [
    'Try typing: "walkthrough" for a step-by-step explanation',
    'Try typing: "simplify" for an ELI5 explanation',
    'Try typing: "mistakes" to see common mistakes',
    'Try typing: "test me" to check your understanding',
    'Try typing: "definition" to see the full definition',
  ]
  const randomSuggestion = suggestions[Math.floor(Math.random() * suggestions.length)]

  return {
    content: `I'm here to help you learn about ${node?.title || 'this topic'}! ${randomSuggestion}. You can also ask me any question about the topic.`,
    type: 'text',
    diagnostic_state: { phase: 'teach' },
  }
}
