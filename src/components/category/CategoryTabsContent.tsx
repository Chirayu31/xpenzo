import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { category } from "@/types/category";
import { convertToSentenceCase } from "@/utils/commonUtility";

interface CategoryTabsContentProps {
  type: string;
  categories?: category[];
}

const CategoryTabsContent: React.FC<CategoryTabsContentProps> = ({
  type,
  categories,
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{convertToSentenceCase(type)}</CardTitle>
      </CardHeader>

      <CardContent>
        {categories ? (
          categories
            .filter((category) => category.type === type)
            .map((category) => <p key={category.id}>{category.title}</p>)
        ) : (
          <p>No categories added yet</p>
        )}
      </CardContent>
    </Card>
  );
};

export default CategoryTabsContent;
