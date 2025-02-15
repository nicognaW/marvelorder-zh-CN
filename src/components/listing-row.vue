<template>
    <div class="listing-row-container relative fill-height w-screen">
        <div
            ref="row"
            class="listing-row flex overflow-x-auto whitespace-no-wrap px-32"
            style="scroll-snap-type: x mandatory;"
        >
            <div class="start-cap w-full flex-shrink-0 max-w-xs snap-start"/>

            <template
                v-for="(listing, index) in sortedListings"
                :key="index"
            >
                <ListingColumn
                    :ref="listing.elementId"
                    :class="[
                        isFocusedListing(listing) ? 'listing-card-initial' : '',
                    ]"
                    :expanded="expandedListingId === listing.elementId"
                    :index="index"
                    :listing="listing"

                    :visibility-class="visibilityClass(listing)"
                    @contract="expandedListingId = null"
                    @expand="expandedListingId = listing.elementId"
                />
            </template>

            <div class="end-cap w-full flex-shrink-0 max-w-xs snap-end"/>
        </div>

        <CircleButton
            aria-label="Scroll to previous listings"
            class="absolute left-12 transform -translate-y-1/2 -translate-x-1/2"
            style="top:50%;"

            @click="scroll(-0.8)"
        >
            <svg class="h-5 w-5 text-gray-400" fill="currentColor" style="transform: scaleX(-1);" viewBox="0 0 20 20">
                <path
                    clip-rule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    fill-rule="evenodd"
                />
            </svg>
        </CircleButton>
        <CircleButton
            aria-label="Scroll to next listings"
            class="absolute right-12 transform -translate-y-1/2 translate-x-1/2"
            style="top:50%;"

            @click="scroll(0.8)"
        >
            <svg class="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path
                    clip-rule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    fill-rule="evenodd"
                />
            </svg>
        </CircleButton>
    </div>
</template>

<script>
import scrollIntoView from 'scroll-into-view-if-needed'

import ListingColumn from './listing-column.vue'
import CircleButton from './circle-button.vue'
import {
    FilteredListings,
    isUpcoming,
} from '~/src/helpers/listing-filters.ts'

export default {
    components: {
        ListingColumn,
        CircleButton,
    },
    props: {
        listings: {
            type: Array,
            required: true,
        },
        initialSort: {
            type: String,
            default: 'default',
        },
    },
    data() {
        return {
            activeListingFilters: [],
            showAllListings: false,
            expandedListingId: null,
        }
    },
    computed: {
        filteredListings() {
            // console.log( 'this.initialSort', this.initialSort )
            return new FilteredListings({
                listings: this.listings,
                initialFilters: this.activeListingFilters,
                listingsSort: this.initialSort,
            })
        },
        sortedListings() {
            // Sort listings by date
            return this.filteredListings.list
        },
        upcomingListings() {
            return this.filteredListings.withFilters([
                [isUpcoming, true],
            ])
        },
        nextUpcomingListing() {
            return this.upcomingListings[0]
        },
        lastListing() {
            return this.sortedListings[this.sortedListings.length - 1]
        },
        focusedListing() {
            if (!this.nextUpcomingListing) {
                return this.lastListing
            }

            return this.nextUpcomingListing
        },
    },
    mounted() {
        // Reveal all listings after a delay
        setTimeout(() => {
            this.showAllListings = true
        }, 1000)

        this.scrollToUpcomingListing()

        // Count listings with logos
        const hasLogoListings = this.sortedListings.filter(hasLogo)
        const noLogoListings = this.sortedListings.filter(listing => !hasLogo(listing))

        // eslint-disable-next-line no-console
        console.log(`Listings with Logos: ${hasLogoListings.length} / ${this.sortedListings.length}`)

        // eslint-disable-next-line no-console
        console.log('Listings without Logos:')
        for (const listing of noLogoListings) {
            // eslint-disable-next-line no-console
            console.log(`${listing.title} (${listing.id})`)
        }

        // const marvelKnights = new FilteredListings( {
        //     listings: this.listings,
        //     initialFilters: new Map( [
        //         [ isMarvelKnightsAnimated, true ],
        //     ] ),
        // } )

        // console.log('marvelKnights', marvelKnights.list)
    },
    methods: {
        async scrollToUpcomingListing() {
            // console.log('nextUpcomingListing', this.nextUpcomingListing)

            const {elementId} = this.focusedListing
            const [elementRef] = this.$refs[elementId]
            const elementNode = elementRef.$el

            // Instant scroll to element before
            // so we can setup a small scroll animation
            // this.$refs.row.scrollLeft = elementNode.previousElementSibling.offsetLeft - window.innerWidth + 275

            // Animate scroll to element before
            //  so that our whole column is visible
            await scrollIntoView(elementNode.previousElementSibling.previousElementSibling, {
                scrollMode: 'always',
                behavior: 'smooth',
                block: 'start',
                inline: 'start',
                duration: 1500,
            })
        },

        isFocusedListing(listing) {
            return listing.elementId === this.focusedListing.elementId
        },

        visibilityClass(listing) {
            // const { elementId } = listing
            // const [ elementRef ] = this.$refs[ elementId ]
            // const elementNode = elementRef.$el

            // Show our upcoming listing first
            if (listing.elementId === this.focusedListing.elementId) {
                return ''
            }

            return this.showAllListings ? '' : 'opacity-0'
        },

        // Scrolls by window width time ratio
        scroll(ratio) {
            const windowWidth = window.innerWidth
            const scrollDistance = windowWidth * ratio

            this.$refs.row.scrollBy({
                // top: 100, // negative value acceptable
                left: scrollDistance,
                behavior: 'smooth',
            })
        },
    },
}
</script>
