import { useState } from 'react'
import styled from '@emotion/styled'
import { motion, AnimatePresence } from 'framer-motion'
import { theme } from '@/styles/theme'

const Section = styled.section`
  padding: ${theme.spacing.xxxl} ${theme.spacing.xl};
  position: relative;
`

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
`

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: ${theme.spacing.xxl};
`

const SectionBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  padding: ${theme.spacing.xs} ${theme.spacing.md};
  background: ${theme.colors.accent}20;
  border: 1px solid ${theme.colors.accent}40;
  border-radius: ${theme.borderRadius.full};
  color: ${theme.colors.accent};
  font-size: ${theme.fontSize.sm};
  font-weight: ${theme.fontWeight.medium};
  margin-bottom: ${theme.spacing.md};
`

const SectionTitle = styled.h2`
  font-size: ${theme.fontSize.xxxl};
  font-weight: ${theme.fontWeight.bold};
  margin-bottom: ${theme.spacing.md};

  span {
    background: linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.secondary});
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
`

const SectionDescription = styled.p`
  font-size: ${theme.fontSize.lg};
  color: ${theme.colors.textSecondary};
`

const FAQList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.md};
`

const FAQItem = styled(motion.div)`
  background: ${theme.colors.glass};
  backdrop-filter: blur(12px);
  border: 1px solid ${theme.colors.glassBorder};
  border-radius: ${theme.borderRadius.xl};
  overflow: hidden;
  transition: border-color ${theme.transitions.fast};

  &:hover {
    border-color: ${theme.colors.primary}40;
  }
`

const FAQQuestion = styled.button<{ isOpen: boolean }>`
  width: 100%;
  padding: ${theme.spacing.lg};
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${theme.spacing.md};
  text-align: left;
  font-size: ${theme.fontSize.md};
  font-weight: ${theme.fontWeight.semibold};
  color: ${theme.colors.text};
  background: transparent;
  cursor: pointer;

  svg {
    width: 20px;
    height: 20px;
    flex-shrink: 0;
    stroke: ${theme.colors.primary};
    transition: transform ${theme.transitions.fast};
    transform: ${({ isOpen }) => (isOpen ? 'rotate(180deg)' : 'rotate(0)')};
  }
`

const FAQAnswer = styled(motion.div)`
  padding: 0 ${theme.spacing.lg} ${theme.spacing.lg};
  font-size: ${theme.fontSize.md};
  color: ${theme.colors.textSecondary};
  line-height: 1.7;

  a {
    color: ${theme.colors.primary};
    text-decoration: underline;

    &:hover {
      color: ${theme.colors.primaryLight};
    }
  }

  ul {
    margin-top: ${theme.spacing.sm};
    padding-left: ${theme.spacing.lg};

    li {
      margin-bottom: ${theme.spacing.xs};
    }
  }
`

const faqs = [
  {
    question: 'How does the flight delay insurance work?',
    answer:
      'When you purchase a policy, your coverage details are recorded on the Mantle blockchain. Our oracle network monitors real-time flight data from multiple trusted sources. If your flight is delayed beyond your coverage threshold, the smart contract automatically triggers a payout to your wallet - no claims process required.',
  },
  {
    question: 'What qualifies as a covered delay?',
    answer:
      'Coverage depends on your plan tier. Basic plans cover delays of 3+ hours, Standard covers 2+ hours, and Premium covers delays of just 1+ hour. Delays are measured from the original scheduled departure time. Cancellations are covered under Standard and Premium plans.',
  },
  {
    question: 'How fast do I receive my payout?',
    answer:
      'Payouts are automatic and typically processed within minutes of the delay being confirmed by our oracle network. Since everything runs on smart contracts, there\'s no manual review process. The average payout time is under 5 minutes.',
  },
  {
    question: 'What is a mutual insurance pool?',
    answer:
      "Instead of a traditional insurance company, EventSure operates as a decentralized mutual pool. All premium payments go into a shared pool that covers everyone's claims. This removes the profit motive of traditional insurers, resulting in lower premiums and higher payouts for travelers.",
  },
  {
    question: 'Which airlines and flights are covered?',
    answer:
      'We cover flights from over 500 airlines worldwide, including all major carriers. Our oracle network integrates with official aviation data sources to track flights globally. Before purchasing, you can verify your specific flight is trackable in our system.',
  },
  {
    question: 'What tokens can I use to pay and receive payouts?',
    answer:
      'All transactions are conducted in MNT (Mantle native token). Premiums are paid in MNT, and payouts are automatically sent in MNT to your connected wallet. The low gas fees on Mantle Network make micro-transactions economically viable.',
  },
  {
    question: 'Is my coverage valid if I miss my flight?',
    answer:
      "No, coverage only applies to airline-caused delays and cancellations. If you miss your flight or arrive late to the airport, the coverage does not apply. The policy specifically covers delays on the airline's side as verified by official flight data.",
  },
  {
    question: 'How do I know my funds are safe?',
    answer:
      'Our smart contracts have been audited by leading security firms. All code is open-source and verifiable on-chain. The mutual pool is managed by audited smart contracts with no single point of control. You can view all transactions and the pool balance in real-time on the blockchain.',
  },
]

export const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <Section>
      <Container>
        <SectionHeader>
          <SectionBadge>Got Questions?</SectionBadge>
          <SectionTitle>
            Frequently Asked <span>Questions</span>
          </SectionTitle>
          <SectionDescription>
            Everything you need to know about decentralized flight insurance.
          </SectionDescription>
        </SectionHeader>

        <FAQList>
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <FAQQuestion
                isOpen={openIndex === index}
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                {faq.question}
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </FAQQuestion>
              <AnimatePresence>
                {openIndex === index && (
                  <FAQAnswer
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {faq.answer}
                  </FAQAnswer>
                )}
              </AnimatePresence>
            </FAQItem>
          ))}
        </FAQList>
      </Container>
    </Section>
  )
}
