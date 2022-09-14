import type { FC } from "react";
import type { ILabel } from "@libs/graphql";
import { CategoryCard } from "@components/Blog/Categories/CategoryCard";
import { useLocaleParser } from "@libs/localeParser";

export interface ICategories {
	categories: ILabel[];
}

export const Categories: FC<ICategories> = ({ categories }) => {
	const parser = useLocaleParser();

	return (
		<div className="px-8 mt-10">
			<h1 className="mb-4 text-xl font-bold text-gray-700 dark:text-white">
				{parser.get("categories")}
			</h1>
			<ul>
				{categories.map((category, idx) => (
					<CategoryCard category={category} key={idx} />
				))}
			</ul>
		</div>
	);
};
