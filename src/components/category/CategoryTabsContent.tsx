import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { category } from "@/types/category";

interface CategoryTabsContentProps {
  title: string;
  categories?: category[];
}

const CategoryTabsContent: React.FC<CategoryTabsContentProps> = ({
  title,
  categories,
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>

      <CardContent>
        {categories ? (
          categories.map((category) => (
            <p key={category.id}>{category.title}</p>
          ))
        ) : (
          <p>
            No categories added yet
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default CategoryTabsContent;
