import * as React from "react";

const animated: {
  [Tag in keyof JSX.IntrinsicElements]: React.ForwardRefExoticComponent<
    React.ComponentPropsWithRef<Tag>
  >
} = {} as any;

function makeAnimated<T extends React.ReactType>(
  _comp: T
): React.ForwardRefExoticComponent<React.ComponentPropsWithRef<T>> {
  return null as any; // not important
}

export interface UpgradedProps {
  show: boolean;
}

export function test<P>(
  component: React.ComponentType<P> | keyof React.ReactHTML
): any {
  // changing to `const Comp: any` un-hangs tsserver
  const Comp =
    typeof component === "string"
      ? animated[component]
      : makeAnimated(component);

  return React.forwardRef<any, P & UpgradedProps>((props, ref) => {
    const { show, ...ownProps } = props;
    return show ? <Comp {...ownProps} ref={ref} /> : null;
  });
}
