import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Tab } from '@mui/material';
import { FunctionComponent, useState } from 'react';
import { Category } from 'src/slices/pokemart';
import { NestedTreeNode } from 'src/utils/functions';
import ProductPage from './ProductPage';

interface NestedTabProps {
  categories: NestedTreeNode<Category>[];
  selectParentCallback?: () => void;
}
const NestedTab: FunctionComponent<NestedTabProps> = ({
  categories,
  selectParentCallback
}) => {
  const [currentCategory, setCurrentCategory] = useState<string>(
    categories.at(0)?.name || ''
  );

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setCurrentCategory(newValue);
    if (selectParentCallback) {
      selectParentCallback();
    }
  };
  return (
    <TabContext value={currentCategory}>
      <TabList onChange={handleChange} variant="fullWidth">
        {categories.map((category) => (
          <Tab key={category.id} label={category.name} value={category.name} />
        ))}
      </TabList>
      {categories.map((category) => (
        <TabPanel key={category.id} value={category.name} sx={{ p: 0, mt: 2 }}>
          {category.children.length > 0 ? (
            <NestedTab
              categories={category.children}
              selectParentCallback={() => setCurrentCategory(category.name)}
            />
          ) : (
            <ProductPage category={category.name} />
          )}
        </TabPanel>
      ))}
    </TabContext>
  );
};

export default NestedTab;
