import * as React from "react"
import { To } from "react-router-dom"
import { Popover, Disclosure, Transition } from "@headlessui/react"
import { useFloating, useInteractions, useDismiss } from "@floating-ui/react"
import {
  HiMiniXMark, HiBars4,
  HiChevronDown, HiChevronUp
} from "react-icons/hi2"
import { Container } from "../Container"
import { Link } from "../Router"
import { HeaderStyle } from "./Resource"

type HeaderProps = {
  children?: React.ReactNode
  logoImage?: string
  logoUrl: To
  menuItems?: MenuItem[]
  linkItems?: MenuItem[]
  sticky?: boolean
}

type MenuItem = {
  to: To
  target?: string
  content: React.ReactNode
  hideCrawl?: boolean
  items?: MenuItem[]
}

const styleBuilder = new HeaderStyle()

export function Header(props: HeaderProps): React.JSX.Element {
  const {
    menuItems = [],
    linkItems = [],
    sticky = false,
    logoUrl,
    logoImage,
  } = props

  styleBuilder.setSticky(sticky)

  const elementClassNames = styleBuilder.buildElement()

  const { refs, context } = useFloating({
    placement: "bottom",
  })
  const dismiss = useDismiss(context)
  const { getReferenceProps } = useInteractions([
    dismiss,
  ])

  return (
    <Popover.Group as="header" ref={refs.setReference} className={elementClassNames} {...getReferenceProps()}>
      <div className="flex xl:hidden h-16 bg-white border-b-[0.2px] border-[rgba(32,_34,_128,_0.15)]">
        <Container size="full" appendClassNames="py-3">
          <div className="w-full h-full flex items-center justify-between z-10">
            <div className="flex flex-row justify-between gap-2">
              <Link to={logoUrl} className="no-underline text-sm">
                <img alt="logo" src={props.logoImage} className="max-h-8" />
              </Link>
            </div>

            <div className="flex flex-row justify-center items-center gap-2">
              <Popover>
                {({ open, close }) => (
                  <>
                    {open && <div className="fixed inset-0 bg-black opacity-30" />}
                    <Popover.Button className="inline-flex items-center justify-center p-2 rounded-md text-confucius-primary">
                      <span className="sr-only">open</span>
                      {open ?
                        <HiMiniXMark className="block h-6 w-6" aria-hidden="true" />
                        :
                        <HiBars4 className="block h-6 w-6" aria-hidden="true" />
                      }
                    </Popover.Button>

                    <Popover.Panel className="absolute top-0 left-0 w-full h-screen bg-white px-6 py-3 z-10">
                      <div className="flex flex-row justify-between items-center gap-2 mb-10">
                        <Link to={logoUrl} className="no-underline text-sm">
                          <img alt="logo" src={logoImage} className="max-h-8" />
                        </Link>
                        <Popover.Button className="inline-flex items-center justify-center p-2 rounded-md text-confucius-primary">
                          <span className="sr-only">open</span>
                          {open ?
                            <HiMiniXMark className="block h-6 w-6" aria-hidden="true" />
                            :
                            <HiBars4 className="block h-6 w-6" aria-hidden="true" />
                          }
                        </Popover.Button>
                      </div>

                      <div className="flex flex-col gap-10 h-full overflow-y-auto">
                        {
                          menuItems.length > 0 &&
                          <ul className="flex flex-col gap-6 md:gap-8 text-center">
                            {
                              menuItems.map((item, i: number) => {
                                return (
                                  <li key={`link-item-mobile-${i}`}>
                                    {
                                      item.items && item.items.length > 0 ?
                                        <Disclosure>
                                          {({ open }) => (
                                            <div className="w-full flex flex-col gap-4">
                                              <Disclosure.Button className={
                                                "flex flex-row justify-center items-center gap-2 text-xl font-medium hover:text-confucius-primary " +
                                                (open ? "text-confucius-primary" : "text-confucius-black")
                                              }>
                                                <span>{item.content}</span>
                                                {open ?
                                                  <HiChevronUp className="block h-4 w-4" aria-hidden="true" />
                                                  :
                                                  <HiChevronDown className="block h-4 w-4" aria-hidden="true" />
                                                }
                                              </Disclosure.Button>

                                              <Disclosure.Panel as="ul" className="flex flex-col gap-4">
                                                {
                                                  item.items &&
                                                  <div className="grid grid-cols-1 gap-2">
                                                    {
                                                      item.items.map((linkItem, j: number) => {
                                                        return (
                                                          <div key={`heading-item-mobile-${i}-${j}`} className="flex flex-col gap-4">
                                                            {
                                                              linkItem.to ?
                                                                <Popover.Button as={Link} to={linkItem.to}
                                                                  target={linkItem.target} hideCrawl={linkItem.hideCrawl}
                                                                  className="no-underline block text-confucius-black hover:text-confucius-primary">
                                                                  {linkItem.content}
                                                                </Popover.Button>
                                                                :
                                                                <span className="block text-confucius-black">
                                                                  {linkItem.content}
                                                                </span>
                                                            }
                                                          </div>
                                                        )
                                                      })
                                                    }
                                                  </div>
                                                }
                                              </Disclosure.Panel>
                                            </div>
                                          )}
                                        </Disclosure>
                                        :
                                        <Link to={item.to} target={item.target} hideCrawl={item.hideCrawl}
                                          className="block no-underline text-xl font-medium text-confucius-black hover:text-confucius-primary"
                                          onClick={() => { close() }}>
                                          {item.content}
                                        </Link>
                                    }
                                  </li>
                                )
                              })
                            }
                          </ul>
                        }
                      </div>

                      {
                        linkItems.length > 0 &&
                        <div className="w-full fixed bottom-0 left-0 bg-white border-t border-confucius-primary shadow py-2.5 lg:px-6">
                          <div className="flex flex-row justify-between items-center gap-3 divide-confucius-primary divide-x">
                            {
                              linkItems.map((item, i: number) => {
                                return (
                                  <React.Fragment key={`d-link-item-${i}`}>
                                    {
                                      item.to ?
                                        <Link to={item.to} target={item.target} hideCrawl={item.hideCrawl}
                                          className="w-full text-center"
                                          onClick={() => {
                                            close()
                                          }}>
                                          <span className="text-xs lg:text-base text-black hover:text-confucius-primary">
                                            {item.content}
                                          </span>
                                        </Link>
                                        :
                                        <div className="w-full text-center"
                                          onClick={() => {
                                            close()
                                          }}>
                                          <span className="text-xs lg:text-base text-black hover:text-confucius-primary">
                                            {item.content}
                                          </span>
                                        </div>
                                    }
                                  </React.Fragment>
                                )
                              })
                            }
                          </div>
                        </div>
                      }
                    </Popover.Panel>
                  </>
                )}
              </Popover>
            </div>
          </div>
        </Container>
      </div>

      <div className="hidden xl:flex h-20 bg-white border-b-[0.2px] border-[rgba(32,_34,_128,_0.15)]">
        <Container size="lg">
          <div className="w-full h-full flex items-center justify-between gap-2">

            <div className="flex flex-row justify-between gap-2 divide-x-2 divide-black">
              <Link to={logoUrl} className="no-underline text-sm px-2">
                <img alt="logo" src={logoImage} className="max-h-10" />
              </Link>
            </div>

            {
              menuItems.length > 0 &&
              <Popover.Group className="flex flex-row items-center justify-between gap-6 2xl:gap-12 3xl:gap-14 p-2">
                {
                  menuItems.map((menuItem, i: number) => {
                    return (
                      <Popover key={`menu-item-desktop-${i}`} className="text-lg">
                        {({ open, close }) => (
                          menuItem.items && menuItem.items.length > 0 ?
                            <SubmenuItem i={i} linkMenu={menuItem} open={open} />
                            :
                            <Link to={menuItem.to} target={menuItem.target} hideCrawl={menuItem.hideCrawl}
                              className="flex flex-row gap-1 text-confucius-black hover:text-confucius-primary"
                              onClick={() => { close() }}>
                              {menuItem.content}
                            </Link>
                        )}
                      </Popover>
                    )
                  })
                }
              </Popover.Group>
            }

            {
              linkItems.length > 0 &&
              <div className="hidden xl:flex flex-row justify-start items-center gap-3 divide-confucius-primary divide-x">
                {
                  linkItems.map((item, i: number) => {
                    return (
                      <React.Fragment key={`d-link-item-${i}`}>
                        {
                          item.to ?
                            <Link to={item.to} target={item.target} hideCrawl={item.hideCrawl}>
                              <span className="pl-3 text-base text-confucius-black hover:text-confucius-primary">
                                {item.content}
                              </span>
                            </Link>
                            :
                            <span className="pl-3 text-base text-confucius-black hover:text-confucius-primary">
                              {item.content}
                            </span>
                        }
                      </React.Fragment>
                    )
                  })
                }
              </div>
            }
          </div>
        </Container>
      </div >
    </Popover.Group >
  )
}

type SubmenuItemProps = {
  i: number
  open: boolean
  linkMenu: MenuItem
}

function SubmenuItem(props: SubmenuItemProps): React.JSX.Element {
  const { i, open, linkMenu } = props

  const { refs, floatingStyles, context } = useFloating({
    placement: "bottom-start",
  })
  const dismiss = useDismiss(context)
  const { getReferenceProps, getFloatingProps } = useInteractions([
    dismiss,
  ])

  return (
    <>
      <Popover.Button ref={refs.setReference} {...getReferenceProps()}
        className={
          "flex flex-row justify-center items-center gap-2 hover:text-confucius-primary text-center " +
          (open ? "text-confucius-primary" : "text-confucius-black")
        }>
        <span>{linkMenu.content}</span>
        {
          open ?
            <HiChevronUp className="block h-4 w-4" aria-hidden="true" />
            :
            <HiChevronDown className="block h-4 w-4" aria-hidden="true" />
        }
      </Popover.Button>

      <Transition as={React.Fragment}
        enter="transition duration-500 ease-out"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-500 ease-out"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0">

        <Popover.Panel className="w-full !top-2 bg-white z-10 p-4 rounded-lg shadow-lg"
          ref={refs.setFloating} style={{ ...floatingStyles, maxWidth: "300px" }} {...getFloatingProps()}>
          {
            linkMenu.items && linkMenu.items.length > 0 &&
            <div className="grid grid-cols-1 gap-4">
              {
                linkMenu.items.map((linkItem, j: number) => {
                  return (
                    <React.Fragment key={`sublink-item-desktop-${i}-${j}`}>
                      <div className="flex flex-col gap-4">
                        {
                          linkItem.to ?
                            <div>
                              <Popover.Button as={Link} to={linkItem.to}
                                target={linkItem.target} hideCrawl={linkItem.hideCrawl}
                                className="no-underline text-lg text-confucius-black hover:text-confucius-primary">
                                {linkItem.content}
                              </Popover.Button>
                            </div>
                            :
                            <span className="text-lg text-confucius-black">
                              {linkItem.content}
                            </span>
                        }
                      </div>

                      {
                        linkMenu.items && j < linkMenu.items?.length - 1 &&
                        <hr className="h-1 text-white" />
                      }
                    </React.Fragment>
                  )
                })
              }
            </div>
          }
        </Popover.Panel>

      </Transition>
    </>
  )
}