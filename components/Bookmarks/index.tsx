import type { FC } from "react";
import { type IBookmark, Bookmark } from "@components/Bookmarks/Bookmark";
import { useLocaleParser } from "@libs/localeParser";

export interface IBookmarks {
	bookmarks: IBookmark[];
}

export const Bookmarks: FC<IBookmarks> = ({ bookmarks }) => {
	const parser = useLocaleParser();

	return (
		<section
			id="projects"
			className="min-h-screen bg-white py-10 px-4 text-black dark:bg-gray-900 dark:text-white"
		>
			<h1 className="mb-10 text-center font-heading text-4xl font-semibold">
				<span className="text-purple-600">
					{parser.get("bookmarks")}
				</span>
			</h1>
			<div className="container mx-auto mb-12">
				<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
					{bookmarks.map((bookmark, idx) => (
						<Bookmark key={idx} {...bookmark} />
					))}
				</div>
			</div>
		</section>
	);
};
