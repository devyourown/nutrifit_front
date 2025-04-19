import React, { useState } from "react";
import Image from "next/image";

type ProductImageCarouselProps = {
    images: string[];
};

export default function ProductImageCarousel({
    images,
}: ProductImageCarouselProps) {
    const [selectedImage, setSelectedImage] = useState(images[0]);

    return (
        <div className="w-full flex flex-col items-center">
            <div className="w-full md:w-3/4 lg:w-1/2">
                <Image
                    src={selectedImage}
                    alt="Product Image"
                    width={500}
                    height={500}
                    className="object-cover rounded-lg w-[500px] h-[500px]"
                />
            </div>
            <div className="flex space-x-4 mt-4">
                {images.map((image, index) => (
                    <button
                        key={index}
                        onClick={() => setSelectedImage(image)}
                        className={`p-1 border ${
                            selectedImage === image
                                ? "border-blue-500"
                                : "border-gray-300"
                        } rounded`}
                    >
                        <Image
                            src={image}
                            alt={`Thumbnail ${index + 1}`}
                            width={50}
                            height={50}
                            className="object-cover"
                        />
                    </button>
                ))}
            </div>
        </div>
    );
}
