import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { SliderLayout } from "vtex.slider-layout";
import { SliderLayoutProps } from "vtex.slider-layout/react/components/SliderContext";

import styles from "./styles.css";

interface SliderProps {
    sliderLayoutProps: SliderLayoutProps;
    productCluster: string;
}

const CustomShelf: StorefrontFunctionComponent<SliderProps> = ({
    sliderLayoutProps,
    productCluster,
}) => {
    const [productData, setProductData] = useState([]);

    const req = async () => {
        const res = await fetch(
            `/api/catalog_system/pub/products/search?fq=productClusterIds:${productCluster}`,
            {
                method: "GET",
                headers: { Accept: "application/json" },
            }
        );

        return res.json();
    };

    useEffect(() => {
        req().then((res) => {
            setProductData(res);
        });
    }, [productCluster]);

    if (productData.length > 0) {
        return (
            <div className={styles.CarouselContainer}>
                <SliderLayout {...sliderLayoutProps}>
                    {productData.map((product: any) => {
                        const name = product?.productName;
                        const img = product?.items[0]?.images[0];
                        const price = product?.items[0]?.sellers[0]
                            ?.commertialOffer?.Price as number;

                        return (
                            <a
                                href={product?.link}
                                className={styles.ProductContainer}
                                key={product?.productId}
                            >
                                <div className={styles.ImageContainer}>
                                    <img
                                        src={img?.imageUrl}
                                        alt={img?.imageText}
                                    />
                                </div>

                                <div className={styles.ProductInfo}>
                                    <span className={styles.ProductName}>
                                        {name}
                                    </span>

                                    <span className={styles.ProductPrice}>
                                        R${" "}
                                        {price
                                            .toFixed(2)
                                            .toString()
                                            .replace(".", ",")}
                                    </span>
                                </div>
                            </a>
                        );
                    })}
                </SliderLayout>
            </div>
        );
    }

    return <></>;
};

export { CustomShelf };

CustomShelf.schema = {
    title: "Prateleira Customizada",
};

CustomShelf.propTypes = {
    productCluster: PropTypes.any,
    sliderLayoutProps: PropTypes.any,
};
