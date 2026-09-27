import BackButton from '@/components/BackButton'

export default function CompetitionsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div>
      <BackButton />
      {children}
    </div>
  )
}
