import { CurrencyToggle } from '@/components/currency-toggle'
import { DataTableFacetedFilter } from '@/components/data-table/data-table-faceted-filter'
import { DataTableViewOptions } from '@/components/data-table/data-table-view-options'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { DataTableFilterableColumn, DataTableSearchableColumn } from '@/types'
import { Cross2Icon } from '@radix-ui/react-icons'
import { Table } from '@tanstack/react-table'

interface LobbyDataTableToolbarProps<TData> {
  table: Table<TData>
  AddNewItem?: ({ groupId }: { groupId: string }) => JSX.Element
  filterableColumns?: DataTableFilterableColumn<TData>[]
  searchableColumns?: DataTableSearchableColumn<TData>[]
  groupId?: string
}

export function LobbyDataTableToolbar<TData>({
  table,
  AddNewItem,
  filterableColumns = [],
  searchableColumns = [],
  groupId,
}: LobbyDataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0

  return (
    <div className="flex w-full items-center justify-between space-x-2 overflow-auto p-1">
      <div className="flex flex-1 items-center space-x-2">
        {searchableColumns.length > 0 &&
          searchableColumns.map(
            (column) =>
              table.getColumn(column.id ? String(column.id) : '') && (
                <Input
                  key={String(column.id)}
                  placeholder={`Filter ${column.title}...`}
                  value={(table.getColumn(String(column.id))?.getFilterValue() as string) ?? ''}
                  onChange={(event) => table.getColumn(String(column.id))?.setFilterValue(event.target.value)}
                  className="h-8 w-[150px] lg:w-[250px]"
                />
              ),
          )}
        {filterableColumns.length > 0 &&
          filterableColumns.map(
            (column) =>
              table.getColumn(column.id ? String(column.id) : '') && (
                <DataTableFacetedFilter
                  key={String(column.id)}
                  column={table.getColumn(column.id ? String(column.id) : '')}
                  title={column.title}
                  options={column.options}
                />
              ),
          )}
        {isFiltered && (
          <Button
            aria-label="Reset filters"
            variant="ghost"
            className="h-8 px-2 lg:px-3"
            onClick={() => table.resetColumnFilters()}
          >
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" aria-hidden="true" />
          </Button>
        )}
      </div>
      <div className="flex items-center space-x-2">
        {groupId ? AddNewItem ? <AddNewItem groupId={groupId} /> : null : null}
        <CurrencyToggle />
        <DataTableViewOptions table={table} />
      </div>
    </div>
  )
}
