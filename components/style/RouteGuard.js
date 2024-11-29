import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { getAuthToken } from "../../store/authSlice";

export { RouteGuard };

function RouteGuard({ children }) {
  const dispatch = useDispatch();
  const authToken = useSelector(getAuthToken);
  const router = useRouter();
  const [authorized, setAuthorized] = useState(true);

  useEffect(() => {
    let path = router.asPath.split("/");
    authCheck(path[1]);
    const hideContent = () => setAuthorized(false);
    router.events.on("routeChangeStart", hideContent);

    // on route change complete - run auth check
    router.events.on("routeChangeComplete", authCheck);

    // unsubscribe from events in useEffect return function
    return () => {
      router.events.off("routeChangeStart", hideContent);
      router.events.off("routeChangeComplete", authCheck);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function authCheck(url) {
    // redirect to login page if accessing a private page and not logged in
    const privatePaths = ["order", "profile", "profile#info"];

    const path = url.split("?")[0];
    if (!authToken && privatePaths.includes(path)) {
      setAuthorized(false);
      router.push({
        pathname: "/login",
        query: { returnUrl: router.asPath },
      });
    } else {
      setAuthorized(true);
    }
  }

  return authorized && children;
}
