import Link from "next/link"
import type { InferGetStaticPropsType, NextPage } from "next"
import { client } from "libs/client"
import type { Blog, Tag } from "types/blog"

export const getStaticProps = async () => {
  const blog = await client.get({ endpoint: "blog" })
  const tag = await client.get({ endpoint: "tag" })

  return {
    props: {
      blogs: blog.contents,
      tags: tag.contents,
    },
  }
}

type Props = {
  blogs: Blog[]
  tags: Tag[]
}

const Home: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  blogs,
  tags,
}: Props) => {
  return (
    <div>
      <ul>
        {(() => {
          if (blogs.length) {
            return (
              blogs.map((blog) => (
                <li key={blog.id}>
                  <Link href={`/blog/${blog.id}`}>
                    {blog.title}
                  </Link>
                </li>
              ))
            )
          } else {
            return (
              <p>ブログ記事が登録されてないよ</p>
            )
          }
        })()}
      </ul>
    </div>
  )
}
export default Home