import React from "react"
import Image from "next/image"
import Link from "next/link"
import type { Article } from "my-articles/types/articles"

interface ArticleCardProps {
  article: Article
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
  const { hero, title, excerpt, author, formattedDate } = article

  return (
    <Link role="article" className="overflow-hidden rounded shadow-md hover:shadow-lg hover:-translate-y-1 hover:rotate-1 transition-all bg-gray-200" href={`/articles/${article._id}`}>
      <Image
        className="aspect-[3] w-full object-cover"
        src={hero}
        alt={title}
        width={600}
        height={200}
      />
      <div className="px-6 py-4 flex flex-col justify-between gap-8">
        <div>
          <div className="mb-2 text-xl font-bold my-0">{title}</div>
          <p className="text-base text-gray-700 line-clamp-2">{excerpt}</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">By {author}</p>
          <p className="text-sm text-gray-600">{formattedDate}</p>
        </div>
      </div>
    </Link>
  )
}

export default ArticleCard