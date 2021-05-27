export const ConditionalWrapper = ({ condition, wrap, children }) =>
  condition ? wrap(children) : children;
