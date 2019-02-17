import * as React from "react";

const animated: {
  [Tag in keyof JSX.IntrinsicElements]: React.ForwardRefExoticComponent<
    React.ComponentPropsWithRef<Tag>
  >
} = {};

function makeAnimated<T extends React.ReactType>(
  comp: T
): React.ForwardRefExoticComponent<React.ComponentPropsWithRef<T>> {
  return null as any; // not important
}

export interface UpgradedProps {
  show: boolean;
}

export function test<P>(
  component: React.ComponentType<P> | keyof React.ReactHTML
): React.ComponentType<P & UpgradedProps> {
  // changing to `const Comp: any` un-hangs tsserver
  const Comp =
    typeof component === "string"
      ? animated[component]
      : makeAnimated(component);

  return React.forwardRef<any, P & UpgradeProps>((props, ref) => {
    const { show, ...ownProps } = props;
    return show ? <Comp {...ownProps} ref={ref} /> : null;
  });
}
