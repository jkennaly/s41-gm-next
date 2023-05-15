import { Menu } from '@headlessui/react'

export default function MenuItem({ itemData, active }) {
  return (
    <Menu.Item>
      {({ active }) => (
        <a
          href={itemData.route}
          className={active ? 'bg-gray-50 block px-3 py-1 text-sm leading-6 text-gray-900' : 'block px-3 py-1 text-sm leading-6 text-gray-900'}
        >
          {itemData.name}
          <span className="sr-only">, {itemData.description}</span>
        </a>
      )}
    </Menu.Item>
  )
}
