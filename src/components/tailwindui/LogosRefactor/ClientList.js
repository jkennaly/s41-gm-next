import { clients } from './clients'
import ClientCard from './ClientCard'
import ClientInvoice from './ClientInvoice'

export default function ClientList() {
  return (
    <ul role="list" className="grid grid-cols-1 gap-x-6 gap-y-8 lg:grid-cols-3 xl:gap-x-8">
      {clients.map((client) => (
        <div key={client.id}>
          <ClientCard client={client} />
          <ClientInvoice invoice={client.lastInvoice} />
        </div>
      ))}
    </ul>
  )
}
