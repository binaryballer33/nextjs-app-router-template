export type NavBarItem = {
  title: string
  route?: string
  icon?: React.ReactNode
  subMenu?: NavBarItem[]
}
