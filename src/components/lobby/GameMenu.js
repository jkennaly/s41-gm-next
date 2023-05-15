import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { EllipsisHorizontalIcon } from '@heroicons/react/20/solid'
import MenuItem from './MenuItem'
import { menuItems } from './menuItems'

export default function GameMenu({ game, sessions }) {
  // You would implement the logic to determine the user's role here.
  // This is a placeholder and needs to be replaced with your actual logic.
  const userRole = 'gm'  // or 'player' or 'guest'

  return (
    <Menu as="div" className="relative ml-auto">
      <Menu.Button className="-m-2.5 block p-2.5 text-gray-400 hover:text-gray-500">
        <span className="sr-only">Open options</span>
        <EllipsisHorizontalIcon className="h-5 w-5" aria-hidden="true" />
      </Menu.Button>
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
          {menuItems.map((item, index) => {
            // If user role is not allowed to see this menu item, skip rendering it
            if (item.flags.includes(`~${userRole}`)) {
              return null
            }

            // If item has a role flag that does not match the user's role, skip rendering it
            if (
              item.flags.length > 0 &&
              !item.flags.includes(userRole) &&
              !item.flags.includes(`~${userRole}`)
            ) {
              return null
            }

            return <MenuItem key={index} itemData={item} />
          })}
        </Menu.Items>
      </Transition>
    </Menu>
  )
}
