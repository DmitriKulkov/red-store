import React, {useEffect, useRef} from "react";
import {Product} from "../entities/product.entity";

export const useObserver = (
    ref: React.MutableRefObject<HTMLDivElement>,
    canLoad: boolean,
    isLoading: boolean,
    callback: Function
) => {
    const observer = useRef<IntersectionObserver>()
    useEffect(() => {
        if (isLoading) return;
        if (observer.current) {
            observer.current.disconnect();
        }
        const cb = function (entries: IntersectionObserverEntry[], observer: IntersectionObserver) {
            if (entries[0].isIntersecting && canLoad) {
             callback()
            }
        };
        observer.current = new IntersectionObserver(cb);
        observer.current.observe(ref.current)
    }, [isLoading])
}