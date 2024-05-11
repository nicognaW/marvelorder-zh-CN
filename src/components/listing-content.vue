<template>
    <div class="flex flex-col items-start gap-8">
        <div class="relative aspect-video w-full flex items-center px-12">
            <ListingLogo
                :base-size="540"
                :src="mappedListing"
                class="h-auto w-full relative transition-all"
            />
        </div>

        <h1
            id="overview"
            class="content-title text-3xl md:text-5xl font-black"
        >
            {{ mappedListing.title }}
        </h1>

        <div
            v-if="daysUntilRelease !== null"
            class="w-full"
        >
            <div class="text-xs">
                Releases in
            </div>
            <div class="text-2xl font-bold">
                {{ daysUntilRelease }} Days
            </div>
        </div>

        <ButtonLink
            v-if="isValidHttpUrl(mappedListing?.watchLinks?.amazon) && context !== 'listing-page'"
            :href="mappedListing.watchLinks.amazon"
            class="amazon-link text-black text-sm font-bold bg-amber-400"
            target="_blank"
        >
            <div class="flex">
                <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path clip-rule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                          fill-rule="evenodd"/>
                </svg>
                <div>
                    Watch on Prime Video
                </div>
            </div>
        </ButtonLink>

        <h2 id="description" class="font-bold">
            描述
        </h2>
        <div class="content-description">
            {{ mappedListing.overview }}
        </div>

        <div class="credits opacity-50">
            <div>数据取自 <a class="underline" href="https://www.themoviedb.org/">The Movie Database</a></div>
            <div
                v-if="hasFanartLogo(mappedListing)"
            >
                图片取自 <a class="underline" href="https://fanart.tv/">Fanart.tv</a>
            </div>

            <div
                v-if="isMcuSheetOrdered(mappedListing)"
            >
                时间顺序取自 <a class="underline"
                                           href="https://docs.google.com/spreadsheets/d/1Xfe--9Wshbb3ru0JplA2PnEwN7mVawazKmhWJjr_wKs/edit#gid=0">r/MarvelStudios
                MCU Viewing</a>
            </div>
        </div>

        <span
            class="relative z-0 inline-flex text-center md:flex-row flex-col shadow-sm md:divide-x md:divide-y-0 divide-y divide-gray-700 border border-gray-300 rounded-md bg-black/50 md:py-3 md:px-0 px-4">
            <template
                v-for="(link, i) in links"
                :key="i"
            >
                <a
                    v-if="link.enabled"
                    :href="link.href"
                    class="relative inline-flex justify-center items-center font-medium focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 text-white"
                    type="button"
                >
                    <div
                        :class="[
                            i !== 0 ? 'md:-ml-px' : '',
                            // Last Link
                            // i === totalLinks - 1 ? 'rounded-r-md' : ''
                        ]"
                        class="inner-link hover:bg-indigo-400 active:bg-indigo-600 rounded-md px-4 md:py-2 md:mx-0 md:-my-3 py-3 -mx-4"
                    >
                        {{ link.label }}
                    </div>
                </a>
            </template>
        </span>
    </div>
</template>

<script>
import {DateTime, Interval} from 'luxon'

import ListingLogo from './listing-logo.vue'
import ButtonLink from './button-link.vue'
import {isValidHttpUrl} from '~/src/helpers/check.ts'
import {makeFunctionUrlFromTmdb} from '~/src/helpers/url.ts'
import {ensureMappedListing} from '~/src/helpers/node/listing.ts'
import {
    hasFanartLogo,
    isMcuSheetOrdered,
    isUpcoming,
} from '~/src/helpers/listing-filters.ts'

const now = DateTime.now()

export default {
    components: {
        ListingLogo,
        ButtonLink,
    },
    props: {
        listing: {
            type: Object,
            required: true,
        },
        context: {
            type: String,
            default: 'listing-column',
        },
    },
    computed: {
        mappedListing() {
            // console.log( 'this.listing', this.listing )

            // Map the listing to the correct format
            return ensureMappedListing(this.listing)
        },
        daysUntilRelease() {
            if (!isUpcoming(this.mappedListing)) {
                return null
            }

            const untilRelease = Interval.fromDateTimes(now, this.mappedListing.date)

            return Math.round(untilRelease.length('days'))
        },
        links() {
            return [
                {
                    enabled: this.context !== 'listing-page',
                    label: '查看详情',
                    href: this.mappedListing.endpoint,
                },
                {
                    enabled: true,
                    label: '查看源代码',
                    href: this.mappedListing.githubEditUrl,
                },
            ]
        },
        backdropUrl() {
            return makeFunctionUrlFromTmdb(this.mappedListing.backdrop_path)
        },
    },
    methods: {
        isValidHttpUrl,

        // Filters
        hasFanartLogo,
        isMcuSheetOrdered,
    },
}
</script>
