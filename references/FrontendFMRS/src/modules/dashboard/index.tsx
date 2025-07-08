import PageContainer from '@/layout/PageContainer'
import PageHeader from '@/components/PageHeader'

export default function Dashboard() {
  return (
    <PageContainer>
      <PageHeader
        title="Welcome, Evan Denari"
        description="This is your operational dashboard. Use the cards below to navigate key modules."
      />

      <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <div className="bg-white rounded-xl shadow p-4">
          <h2 className="text-base font-semibold text-slate-800">Site Management</h2>
          <p className="text-sm text-slate-500">Manage properties, site reports, and data</p>
        </div>
        <div className="bg-white rounded-xl shadow p-4">
          <h2 className="text-base font-semibold text-slate-800">Sales</h2>
          <p className="text-sm text-slate-500">View prospects and performance</p>
        </div>
        <div className="bg-white rounded-xl shadow p-4">
          <h2 className="text-base font-semibold text-slate-800">Properties</h2>
          <p className="text-sm text-slate-500">Interactive property map and search</p>
        </div>
      </section>
    </PageContainer>
  )
}
