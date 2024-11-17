import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { TransactionType } from "@prisma/client";
import CategoryTabsContent from "./CategoryTabsContent";
import { Button } from "../ui/button";
import AddCategory from "./AddCategory";

const Add = "Add"

const CategoryTabs = () => {
  return (
    <Tabs className="w-[500px] mt-8" defaultValue={TransactionType.EXPENSE}>
      <TabsList>
        <TabsTrigger value={TransactionType.EXPENSE}>Expense</TabsTrigger>
        <TabsTrigger value={TransactionType.INCOME}>Income</TabsTrigger>
        <TabsTrigger value={Add}>Add New</TabsTrigger>
      </TabsList>

      <TabsContent value={TransactionType.EXPENSE}>
        <CategoryTabsContent title={"Expense"} />
      </TabsContent>
      <TabsContent value={TransactionType.INCOME}>
        <CategoryTabsContent title={"Income"} />
      </TabsContent>
      <TabsContent value={Add}>
        <AddCategory />
      </TabsContent>
    </Tabs>
  );
};

export default CategoryTabs;
