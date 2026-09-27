import Link from 'next/link'

interface CompetitionCardProps {
  id: string
  title: string
  description: string
  icon: string
  cta: string
}

export default function CompetitionCard({
  id,
  title,
  description,
  icon,
  cta
}: CompetitionCardProps) {
  return (
    <div className="card group">
      <div className="text-5xl mb-4">{icon}</div>
      <h3 className="font-serif font-bold text-xl mb-3 group-hover:text-gold transition">
        {title}
      </h3>
      <p className="text-gray-600 mb-6">
        {description}
      </p>
      <Link
        href={`/competitions/${id}`}
        className="inline-flex items-center text-gold font-semibold hover:gap-2 transition-all gap-1"
      >
        {cta}
        <span>→</span>
      </Link>
    </div>
  )
}
