import CategoryHeader from "@/components/category/Header";
import CategoryTabs from "@/components/category/Tabs";
import React from "react";

const Category = () => {
  return (
    <div className="m-10">
      <CategoryHeader />
      <div className="flex w-full justify-center">
        <CategoryTabs />
      </div>
    </div>
  );
};

export default Category;
