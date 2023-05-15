import { Fragment } from 'react'
import { Transition, Menu } from '@headlessui/react'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function ClientMenu({ client }) {
  return (
    <Transition
      as={Fragment}
      enter="transition ease-out duration-100"
      enterFrom="transform opacity-0 scale-95"
      enterTo="transform opacity-100 scale-100"
      leave="transition ease-in duration-75"
      leaveFrom="transform opacity-100 scale-100"
      leaveTo="transform opacity-0 scale-95"
    >
      <Menu.Items className="absolute right-0 z-10 mt-0.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
        <Menu.Item>
          {({ active }) => (
            <a
              href="#"
              className={classNames(
                active ? 'bg-gray-50' : '',
                'block px-3 py-1 text-sm leading-6 text-gray-900'
              )}
            >
              View<span className="sr-only">, {client.name}</span>
            </a>
          )}
        </Menu.Item>
        <Menu.Item>
          {({ active }) => (
            <a
              href="#"
              className={classNames(
                active ? 'bg-gray-50' : '',
                'block px-3 py-1 text-sm leading-6 text-gray-900'
              )}
            >
              Edit<span className="sr-only">, {client.name}</span>
            </a>
          )}
        </Menu.Item>
      </Menu.Items>
    </Transition>
  )
}
