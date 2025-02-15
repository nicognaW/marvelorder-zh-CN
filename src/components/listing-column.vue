<template>
    <article
        :id="`${listing.elementId}-listing-card`"
        :class="[
            expanded ? 'listing-card-expanded border-x overflow-hidden' : '',
        ]"
        :style="{
            maxWidth: `${articleWidth + 2}px`,
            flexBasis: `${articleWidth + 2}px`,
        }"
        class="listing-card group relative w-full flex-shrink-0 flex-grow-0 snap-start transition-all duration-500 ease-in-out"
    >
        <Transition
            enter-active-class="animate__animated animate__tada"
            leave-active-class="animate__animated animate__bounceOutRight"
            name="custom-classes"
        >
            <div
                v-if="!expanded"
                :class="[
                    `listing-card-container flex gap-8 ${outerDirection} h-screen justify-${modes.outer}`,
                ]" class="cursor-pointer"

                @click.prevent.capture="expand()"
            >
                <div
                    :class="[
                        `inner-container flex ${outerDirection} h-full w-full justify-end`,
                        visibilityClass,
                    ]" class="transition-opacity ease-in-out duration-750"
                >
                    <div class="inner-container relative py-16">
                        <a
                            :href="listing.endpoint"
                        >
                            <div
                                :style="{ width: `${markWidth}px` }"
                                class="listing-card-content absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col justify-center"
                            >
                                <ListingLogo
                                    v-if="logo"
                                    :alt="title"
                                    :base-size="markWidth"
                                    :src="logo"
                                    :style="{ width: `${markWidth}px` }"
                                    class="h-auto relative"
                                />
                                <h2
                                    v-else
                                    class="w-full text-3xl test-white font-bold text-center whitespace-normal"
                                >{{ title }}</h2>
                            </div>
                        </a>
                    </div>

                    <div
                        :class="`vertical-line-container relative flex gap-4 ${outerDirection} ${innerHeight}`"
                    >
                        <div
                            :class="[
                                listing.hasDate ? '' : 'opacity-10',
                            ]" class="vertical-line w-1 bg-current h-full"
                        />
                        <div
                            :class="[
                                listing.hasDate ? '' : 'opacity-20',
                            ]" class="listing-date w-32 text-center font-bold uppercase"
                        >
                            {{ listing.dateHumanReadable }}
                        </div>
                    </div>
                </div>

                <div
                    :class="[
                        expanded ? 'opacity-0' : 'opacity-100',
                    ]" class="center-line w-full border border-x-transparent border-y-white h-32"
                />

                <div
                    class="inner-container h-full"
                />
            </div>
        </Transition>

        <Transition>
            <div
                v-if="expanded"
                :style="{
                    width: `${articleWidth}px`,
                }"
                class="relative h-screen bg-black z-10"
            >
                <div
                    class="backdrop absolute inset-0"
                >
                    <TmdbImage
                        v-if="!!listing.backdrop_path"
                        :src="listing.backdrop_path"
                        class="absolute w-full h-screen object-cover inset-0 linear-mask"
                    />
                </div>

                <ListingContent
                    :listing="listing"
                    class="relative h-full overflow-scroll p-8 pb-72"
                />

                <CircleButton
                    class="close-button absolute bottom-24 left-1/2 transform-gpu -translate-x-1/2 translate-y-1/2"
                    @click="contract()"
                >
                    <svg class="h-6 w-6" fill="none" stroke="currentColor" stroke-width="2"
                         viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6 18L18 6M6 6l12 12" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </CircleButton>
            </div>
        </Transition>

        <div
            v-if="!expanded"
            class="overlay w-60 flex justify-center items-center pointer-events-none absolute inset-y-0 left-1/2 -translate-x-1/2"
        >
            <div class="relative flex justify-center w-full">
                <SeenButton
                    :listing="listing"
                    class="pointer-events-auto"
                />
            </div>
        </div>
    </article>
</template>

<script>
import scrollIntoView from 'scroll-into-view-if-needed'

import ListingLogo from './listing-logo.vue'
import ListingContent from './listing-content.vue'
import CircleButton from './circle-button.vue'
import SeenButton from './seen-button.vue'
import TmdbImage from './tmdb-image.vue'
import {getLayoutModes} from '~/src/helpers/layout.ts'

export default {
    components: {
        ListingLogo,
        ListingContent,
        CircleButton,
        SeenButton,
        TmdbImage,
    },
    props: {
        listing: {
            type: Object,
            required: true,
        },
        index: {
            type: Number,
            required: true,
        },
        markWidth: {
            type: Number,
            default: 175,
        },
        width: {
            type: Number,
            default: 110,
        },
        visibilityClass: {
            type: String,
            default: '',
        },
        expanded: {
            type: Boolean,
            default: false,
        },
    },
    emits: [
        'expand',
        'contract',
    ],
    computed: {
        title() {
            return this.listing.title
        },
        modes() {
            return getLayoutModes(this.index)
        },
        outerDirection() {
            return this.modes.outer === 'start' ? 'flex-col' : 'flex-col-reverse'
        },
        innerHeight() {
            return this.modes.inner === 'start' ? 'h-1/2' : 'h-1/5'
        },
        logo() {
            return this.listing?.logo_on_black
        },
        articleWidth() {
            if (this.expanded) {
                return Math.min(window.innerWidth, 540)
            }

            return this.width
        },
    },
    methods: {
        expand() {
            // console.log('expanding')

            this.$emit('expand', this.listing)

            scrollIntoView(this.$el, {
                scrollMode: 'if-needed',
                block: 'start',
                inline: 'start',
                behavior: 'smooth',
            })
        },
        contract() {
            // console.log('contracting')

            this.$emit('contract', this.listing)
        },
    },
}
</script>
