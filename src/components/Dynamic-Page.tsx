'use client'
import Image from "next/image"
import Link from "next/link"
import { ChevronRight } from 'lucide-react'
import { useState } from "react"
import { Heart, Truck, RotateCcw } from 'lucide-react'
import { Button } from "@/components/ui/Button"

interface BreadcrumbItem {
    label: string
    href: string
}

interface BreadcrumbProps {
    items: BreadcrumbItem[]
}

function Breadcrumb({ items }: BreadcrumbProps) {
    return (
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
            {items.map((item, index) => (
                <div key={item.href} className="flex items-center">
                    {index > 0 && <ChevronRight className="w-4 h-4 mx-2" />}
                    <Link
                        href={item.href}
                        className="hover:text-gray-900 transition-colors"
                    >
                        {item.label}
                    </Link>
                </div>
            ))}
        </nav>
    )
}


interface Color {
    name: string
    value: string
}

interface Size {
    label: string
    value: string
}

const colors: Color[] = [
    { name: "White", value: "#FFFFFF" },
    { name: "Pink", value: "#EC7272" },
]

const sizes: Size[] = [
    { label: "XS", value: "xs" },
    { label: "S", value: "s" },
    { label: "M", value: "m" },
    { label: "L", value: "l" },
    { label: "XL", value: "xl" },
]

function ProductDetail() {
    const [selectedColor, setSelectedColor] = useState(colors[0])
    const [selectedSize, setSelectedSize] = useState(sizes[2])
    const [quantity, setQuantity] = useState(2)

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-medium">Havic HV G-92 Gamepad</h1>

            <div className="flex items-center gap-4">
                <StarRating rating={4} reviews={150} />
                <span className="text-sm text-green-500">|  In Stock</span>
            </div>

            <div className="text-2xl font-medium">$192.00</div>

            <p className="text-gray-600">
                PlayStation 5 Controller Skin High quality vinyl with air channel adhesive
                for easy bubble free install & mess free removal Pressure sensitive.
            </p>

            <div className="space-y-4">
                <div>
                    <h3 className="text-base font-medium mb-2">Colours:</h3>
                    <div className="flex gap-2">
                        {colors.map((color) => (
                            <button
                                key={color.name}
                                className={`w-8 h-8 rounded-full border-2 ${selectedColor.name === color.name
                                    ? "border-black"
                                    : "border-transparent"
                                    }`}
                                style={{ backgroundColor: color.value }}
                                onClick={() => setSelectedColor(color)}
                                aria-label={`Select ${color.name} color`}
                            />
                        ))}
                    </div>
                </div>

                <div>
                    <h3 className="text-base font-medium mb-2">Size:</h3>
                    <div className="flex gap-2">
                        {sizes.map((size) => (
                            <button
                                key={size.value}
                                className={`w-12 h-8 rounded border ${selectedSize.value === size.value
                                    ? "bg-red-500 text-white border-red-500"
                                    : "border-gray-300 hover:border-gray-400"
                                    }`}
                                onClick={() => setSelectedSize(size)}
                            >
                                {size.label}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <div className="flex items-center border rounded-sm">
                        <button
                            className="px-4 py-2 text-xl"
                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        >
                            −
                        </button>
                        <span className="w-12 text-center">{quantity}</span>
                        <button
                            className="px-4 py-2 text-xl"
                            onClick={() => setQuantity(quantity + 1)}
                        >
                            +
                        </button>
                    </div>
                    <Button className="bg-red-500 hover:bg-red-600">Buy Now</Button>
                    <Button variant="outline" size="icon">
                        <Heart className="w-5 h-5" />
                    </Button>
                </div>

                <div className="space-y-4 pt-4 border-t">
                    <div className="flex items-center gap-4 p-4 border rounded-sm">
                        <Truck className="w-6 h-6" />
                        <div>
                            <h4 className="font-medium">Free Delivery</h4>
                            <button className="text-sm underline">
                                Enter your postal code for Delivery Availability
                            </button>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 p-4 border rounded-sm">
                        <RotateCcw className="w-6 h-6" />
                        <div>
                            <h4 className="font-medium">Return Delivery</h4>
                            <p className="text-sm">
                                Free 30 Days Delivery Returns.{" "}
                                <button className="underline">Details</button>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

interface ProductImage {
    src: string
    alt: string
}

interface ProductGalleryProps {
    images: ProductImage[]
}

function ProductGallery({ images }: ProductGalleryProps) {
    const [selectedImage, setSelectedImage] = useState(0)

    return (
        <div className="flex gap-4">
            <div className="flex flex-col gap-4">
                {images.map((image, index) => (
                    <button
                        key={index}
                        className={`w-24 h-24 border rounded-sm overflow-hidden ${selectedImage === index ? "border-black" : "border-gray-200"
                            }`}
                        onClick={() => setSelectedImage(index)}
                    >
                        <Image
                            src={image.src || "/placeholder.svg"}
                            alt={image.alt}
                            width={96}
                            height={96}
                            className="object-cover w-full h-full"
                        />
                    </button>
                ))}
            </div>
            <div className="flex-1 aspect-square relative bg-[#F5F5F5] rounded-sm">
                <Image
                    src={images[selectedImage].src || "/placeholder.svg"}
                    alt={images[selectedImage].alt}
                    fill
                    className="object-contain p-8"
                />
            </div>
        </div>
    )
}

import { Star } from 'lucide-react'

interface StarRatingProps {
    rating: number
    reviews: number
}

export function StarRating({ rating, reviews }: StarRatingProps) {
    return (
        <div className="flex items-center gap-2">
            <div className="flex">
                {[...Array(5)].map((_, index) => (
                    <Star
                        key={index}
                        className={`w-4 h-4 ${index < rating
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-gray-200 fill-gray-200"
                            }`}
                    />
                ))}
            </div>
            <span className="text-sm text-gray-500">({reviews} Reviews)</span>
        </div>
    )
}
const breadcrumbItems = [
    { label: "Account", href: "/account" },
    { label: "Gaming", href: "/gaming" },
    { label: "Havic HV G-92 Gamepad", href: "/products/havic-hv-g92-gamepad" },
]

const productImages = [
    {
        src: "/placeholder.svg",
        alt: "Product image 1"
    },
    {
        src: "/placeholder.svg",
        alt: "Product image 2"
    },
    {
        src: "/placeholder.svg",
        alt: "Product image 3"
    },
    {
        src: "/placeholder.svg",
        alt: "Product image 4"
    },
]

export default function ProductPage() {
    return (
        <main className="container mx-auto px-4 py-8">
            <Breadcrumb items={breadcrumbItems} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <ProductGallery images={productImages} />
                <ProductDetail />
            </div>
        </main>
    )
}


