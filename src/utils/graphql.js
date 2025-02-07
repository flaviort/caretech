const websiteUrl = 'https://getsw.theskylineagency.com/graphql'


// get acf homepage
export async function getACFHomePage() {
    try {
        const res = await fetch(websiteUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                query: `
                    query GetAcfHomePage {
                        pages {
                            nodes {
                                home {
                                    bannerSubtitle
                                    bannerSubtitleDriven
                                    bannerTitle
                                    bannerVideo {
                                    node {
                                            link
                                            mediaItemUrl
                                        }
                                    }
                                }
                            }
                        }
                    }
                `
            })
        })
    
        const responseBody = await res.text()
        const data = JSON.parse(responseBody)

        //console.log('data', data);
    
        if (data.errors) {
            console.error('GraphQL errors:', data.errors)
            return null
        }
    
        return data.data.pages.nodes
    } catch (error) {
        console.error('Error fetching acf home page:', error)
        return null
    }
}

// fetch all posts
export async function getPosts() {
    let allPosts = []
    let hasNextPage = true
    let after = null

    while (hasNextPage) {
        try {
        const res = await fetch(websiteUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                query: `
                    query GetAllPosts($after: String) {
                        posts(first: 100, after: $after) {
                            edges {
                                cursor
                                node {
                                    title
                                    date
                                    posts {
                                        post
                                        images {
                                            image {
                                                node {
                                                    mediaItemUrl
                                                }
                                            }
                                        }
                                        videos {
                                            video {
                                                node {
                                                    mediaItemUrl
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                            pageInfo {
                                endCursor
                                hasNextPage
                            }
                        }
                    }
                `,
                variables: { after }
            })
        })

        const data = await res.json()

        if (data.errors) {
            console.error('GraphQL errors:', data.errors)
            return allPosts
        }

        const edges = data?.data?.posts?.edges || []
        const pageInfo = data?.data?.posts?.pageInfo

        const nodes = edges.map((edge) => edge.node)
        allPosts = [...allPosts, ...nodes]

        after = pageInfo.endCursor
        hasNextPage = pageInfo.hasNextPage

        } catch (error) {
            console.error('Error fetching all posts:', error)
            return allPosts
        }
    }

    return allPosts
}