import { Menu } from '@headlessui/react'
import { EllipsisHorizontalIcon } from '@heroicons/react/20/solid'
import ClientMenu from './ClientMenu'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function ClientCard({ client }) {
  return (
    <li key={client.id} className="overflow-hidden rounded-xl border border-gray-200">
      <div className="flex items-center gap-x-4 border-b border-gray-900/5 bg-gray-50 p-6">
        <img
          src={client.imageUrl}
          alt={client.name}
          className="h-12 w-12 flex-none rounded-lg bg-white object-cover ring-1 ring-gray-900/10"
        />
        <div className="text-sm font-medium leading-6 text-gray-900">{client.name}</div>
        <Menu as="div" className="relative ml-auto">
          <Menu.Button className="-m-2.5 block p-2.5 text-gray-400 hover:text-gray-500">
            <span className="sr-only">Open options</span>
            <EllipsisHorizontalIcon className="h-5 w-5" aria-hidden="true" />
          </Menu.Button>
          <ClientMenu client={client} />
        </Menu>
      </div>
    </li>
  )
}
