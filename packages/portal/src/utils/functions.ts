export const formatNumber = (value?: string | number | null) => {
  if (!value) {
    return '';
  }

  switch (typeof value) {
    case 'number':
      return value.toLocaleString();
    case 'string': {
      if (isNaN(Number(value))) {
        return value;
      }
      return value.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
    default:
      return value;
  }
};

export type NestedTreeNode<T> = T & {
  children: NestedTreeNode<T>[];
};

const insertIntoTree = <T>(
  arr: NestedTreeNode<T>[],
  value: NestedTreeNode<T>,
  identityKey: keyof NestedTreeNode<T>,
  parentKey: keyof NestedTreeNode<T>
) => {
  if (!value[parentKey]) {
    arr.push(value);
    return true;
  }
  for (const ele of arr) {
    if (ele[identityKey] === value[parentKey]) {
      ele.children.push(value);
      return true;
    } else if (
      ele.children.length > 0 &&
      insertIntoTree(ele.children, value, identityKey, parentKey)
    ) {
      return true;
    }
  }

  return false;
};

export const getTreeFromFlattenArray = <T>(
  data: readonly T[],
  identityKey: keyof T,
  parentKey: keyof T
): NestedTreeNode<T>[] => {
  const mutatableData: NestedTreeNode<T>[] = [];

  let remainElement: T[] = [...data];

  do {
    remainElement = remainElement.filter(
      (e) =>
        !insertIntoTree(
          mutatableData,
          { ...e, children: [] },
          identityKey,
          parentKey
        )
    );
  } while (remainElement.length > 0);

  return mutatableData;
};

export const getCurrentDate = () => new Date().getTime();
