import { statuses } from './statuses'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function ClientInvoice({ invoice }) {
  return (
    <dl className="-my-3 divide-y divide-gray-100 px-6 py-4 text-sm leading-6">
      <div className="flex justify-between gap-x-4 py-3">
        <dt className="text-gray-500">Last invoice</dt>
        <dd className="text-gray-700">
          <time dateTime={invoice.dateTime}>{invoice.date}</time>
        </dd>
      </div>
      <div className="flex justify-between gap-x-4 py-3">
        <dt className="text-gray-500">Amount</dt>
        <dd className="flex items-start gap-x-2">
          <div className="font-medium text-gray-900">{invoice.amount}</div>
          <div
            className={classNames(
              statuses[invoice.status],
              'rounded-md py-1 px-2 text-xs font-medium ring-1 ring-inset'
            )}
          >
            {invoice.status}
          </div>
        </dd>
      </div>
    </dl>
  )
}
