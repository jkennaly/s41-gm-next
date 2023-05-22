import Link from 'next/link'

export default function CharacterCreate({  }) {
  return (
    <Link href={`/prep/create/character/mgt2e`}>
        <li className={`overflow-hidden rounded-xl border `}>
          <div className="flex items-center gap-x-4 border-b border-gray-900/5 bg-gray-50 p-6">
            Create a Character
          </div>
        </li>
    </Link>
  )
}
