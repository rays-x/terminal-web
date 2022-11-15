import React from 'react'
import {useState, useRef, useContext} from 'react'
import {FixedSizeList, FixedSizeListProps} from 'react-window'

/** Context for cross component communication */
const VirtualTableContext = React.createContext<{
  top: number
  setTop: (top: number) => void
  header: React.ReactNode
  footer: React.ReactNode
  tableProps: any
  tbodyProps: any
}>({
  top: 0,
  setTop: (value: number) => {
  },
  header: <></>,
  footer: <></>,
  tableProps: {},
  tbodyProps: {},
})

/** The virtual table. It basically accepts all of the same params as the original FixedSizeList.*/
export function VirtualTable({
                               row,
                               header,
                               footer,
                               tableProps,
                               tbodyProps,
                               ...rest
                             }: {
  header?: React.ReactNode
  footer?: React.ReactNode
  row: FixedSizeListProps['children']
  tableProps?: any,
  tbodyProps?: any,
} & Omit<FixedSizeListProps, 'children' | 'innerElementType'>) {
  const listRef = useRef<FixedSizeList | null>()
  const [top, setTop] = useState(0)
  return (
    <VirtualTableContext.Provider value={{top, setTop, header, footer, tableProps, tbodyProps}}>
      <FixedSizeList
        {...rest}
        innerElementType={Inner}
        onItemsRendered={(props: any) => {
          const style =
            listRef.current &&
            // @ts-ignore private method access
            listRef.current._getItemStyle(props.overscanStartIndex)
          setTop((style && style.top) || 0)
          rest.onItemsRendered && rest.onItemsRendered(props)
        }}
        ref={(el: any) => (listRef.current = el)}
      >
        {row}
      </FixedSizeList>
    </VirtualTableContext.Provider>
  )
}

/**
 * The Inner component of the virtual list. This is the "Magic".
 * Capture what would have been the top elements position and apply it to the table.
 * Other than that, render an optional header and footer.
 **/
const Inner = React.forwardRef<HTMLDivElement, React.HTMLProps<HTMLDivElement>>(
  function Inner({children, ...rest}, ref) {
    const {header, footer, top, tableProps, tbodyProps} = useContext(VirtualTableContext)
    return (
      <div {...rest} ref={ref}>
        <table style={{top, position: 'absolute', width: '100%'}} {...tableProps}>
          {header}
          <tbody {...tbodyProps}>{children}</tbody>
          {footer}
        </table>
      </div>
    )
  }
)
