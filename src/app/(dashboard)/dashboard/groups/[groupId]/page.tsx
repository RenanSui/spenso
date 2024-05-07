import { getGroupById, updateGroup } from '@/actions/server/transactions-groups'
import { LoadingButton } from '@/components/loading-button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { updateGroupSchema } from '@/lib/validations/group'
import { DeleteGroupDialog } from './_components/delete-group-dialog'

type GroupPageProps = {
  params: {
    groupId: string
  }
}

async function getGroupFromParmas(params: GroupPageProps) {
  const groupId = params.params.groupId

  const group = await getGroupById(groupId)

  if (!group) return null

  return group
}

export async function generateMetadata(params: GroupPageProps) {
  const group = await getGroupFromParmas(params)

  if (!group) {
    return {}
  }

  return {
    metadataBase: new URL('https://spenso.vercel.app'),
    title: `Manage ${group.title} group`,
    description: `Manage your ${group.title} group transactions.`,
  }
}

export default async function Page(params: GroupPageProps) {
  const group = await getGroupFromParmas(params)

  if (!group) return null

  const onSubmit = async (formData: FormData) => {
    'use server'
    const { title } = updateGroupSchema.parse(formData)
    await updateGroup({ title, id: group.id })
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 xs:flex-row xs:items-center xs:justify-between">
        <h2 className="text-2xl font-bold tracking-tight">{group.title}</h2>
      </div>

      <Card as="section">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Update your group</CardTitle>
          <CardDescription>Update your group name or delete it</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={onSubmit} className="grid w-full max-w-xl gap-5">
            <div className="grid gap-2.5">
              <Label htmlFor="update-group-name">Name</Label>
              <Input
                id="update-group-name"
                aria-describedby="update-group-name-description"
                name="title"
                required
                minLength={3}
                maxLength={50}
                placeholder="Type group name here."
                defaultValue={group.title}
              />
            </div>
            <div className="flex flex-col gap-2 xs:flex-row">
              <LoadingButton action="update">
                Update group
                <span className="sr-only">Update group</span>
              </LoadingButton>
              <DeleteGroupDialog groupId={group.id} />
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
