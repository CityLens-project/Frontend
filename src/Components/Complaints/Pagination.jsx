import Button from '../Dashboard/Button'


function getPageItems(current, total) {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1)

  const pages = new Set([1, total, current - 1, current, current + 1])
  if (current <= 2) pages.add(3)
  if (current >= total - 1) pages.add(total - 2)

  const sorted = [...pages].filter((p) => p >= 1 && p <= total).sort((a, b) => a - b)
  const items = []
  sorted.forEach((p, i) => {
    if (i > 0) {
      const gap = p - sorted[i - 1]
      if (gap === 2) items.push(p - 1)
      else if (gap > 2) items.push('…')
    }
    items.push(p)
  })
  return items
}

export default function Pagination({ page, pageSize, total, onPageChange }) {
  const totalPages = Math.max(1, Math.ceil(total / pageSize))
  const from = total === 0 ? 0 : (page - 1) * pageSize + 1
  const to = Math.min(page * pageSize, total)

  return (
    <div className="flex flex-wrap items-center justify-between gap-4">
      <p className="text-xs leading-[1.45] text-slate-500">
        {total === 0 ? 'No complaints to show' : `Showing ${from}–${to} of ${total} complaints`}
      </p>

      {totalPages > 1 && (
        <nav aria-label="Pagination" className="flex flex-wrap items-center gap-2">
          <Button disabled={page === 1} onClick={() => onPageChange(page - 1)}>
            Previous
          </Button>

          {getPageItems(page, totalPages).map((item, i) =>
            item === '…' ? (
              <span key={`gap-${i}`} aria-hidden="true" className="px-1 text-slate-500">
                …
              </span>
            ) : (
              <Button
                key={item}
                variant={item === page ? 'primary' : 'secondary'}
                aria-current={item === page ? 'page' : undefined}
                aria-label={`Page ${item}`}
                onClick={() => onPageChange(item)}
              >
                {item}
              </Button>
            ),
          )}

          <Button disabled={page === totalPages} onClick={() => onPageChange(page + 1)}>
            Next
          </Button>
        </nav>
      )}
    </div>
  )
}