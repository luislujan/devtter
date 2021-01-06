import AppLayout from "components/AppLayout";
import Devit from "components/Devit";
import { useEffect, useState } from "react"
import useUser from 'hooks/useUser'
import {fetchLatestDevits} from 'firebase/client'

export default function HomePage() {
    const [timeline, setTimeLine] = useState([])
    const user = useUser()

    useEffect(() => {
      user && fetchLatestDevits().then(setTimeLine)
    }, [user])

    return (
        <>
            <AppLayout>
                <header>
                    <h2> Inicio </h2>
                </header>
                <section>
                    {timeline.map(({ id, userName, avatar, createdAt, content, userId}) => (
                        <Devit
                            avatar={avatar}
                            createdAt={createdAt}
                            id={id}
                            key={id}
                            content={content}
                            userName={userName}
                            userId={userId}
                        />
                    ))}
                </section>
                <nav>

                </nav>
            </AppLayout>

            <style jsx>{`
                header {
                    align-items: center;
                    background: #ffffffaa;
                    backdrop-filter: blur(5px);
                    border-bottom: 1px solid #eee;
                    height: 49px;
                    display: flex;
                    position: sticky;
                    top: 0;
                    width: 100%;
                }

                h2 {
                    font-size: 21px;
                    font-weight: 800;
                    padding-left: 15px;
                }
                
                nav {
                    background: #fff;
                    bottom: 0;
                    border-top: 1px solid #eee;
                    height: 49px;
                    position: sticky;
                    width: 100%;
                }
            `}</style>
        </>
    )
}