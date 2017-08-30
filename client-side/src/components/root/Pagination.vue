<template>  
	<nav aria-label="Page navigation">
		<ul class="pagination">
			
		<li :class="{ disabled: source.current_page == 1 }">
				<a class="page-link" href="#" @click="nextPrev($event, source.current_page-1)" aria-label="Previous">
					<span aria-hidden="true">&laquo;</span>
					<span class="sr-only">Previous</span>
				</a>
			</li>

			<li v-for="page in pages" track-by="$index" :class="{ active: source.current_page == page }">
				<span v-if="page == '...'">{{ page }}</span>
				<a v-if="page != '...'" class="page-link" href="#" @click="onPageChange($event, page)">{{ page }}</a>
			</li>

			<li :class="{ disabled: source.current_page == source.last_page }">
				<a class="page-link" href="#" @click="nextPrev($event, source.current_page+1)" aria-label="Next">
					<span aria-hidden="true">&raquo;</span>
					<span class="sr-only">Next</span>
				</a>
			</li>
		</ul>
	</nav>
</template>  

<script>  
import bus from '../../utils/events/bus'

export default {

	props: ['source'],

	data () {
		return {
			pages: []
		}
	},

	methods: {

		onPageChange (event, page) {
			event.preventDefault()
			this.$emit('page-change', page)
		},

		nextPrev (event, page) {
			if(page == 0 || page == this.source.last_page+1) return false

			this.onPageChange(event, page)
		},

		generatePagesArray (currentPage, collectionLength, rowsPerPage, paginationRange)
		{
				let pages = []
				let totalPages = Math.ceil(collectionLength / rowsPerPage)
				let halfWay = Math.ceil(paginationRange / 2)
				let position

				if (currentPage <= halfWay) {
						position = 'start'
				} else if (totalPages - halfWay < currentPage) {
						position = 'end'
				} else {
						position = 'middle'
				}

				let ellipsesNeeded = paginationRange < totalPages
				let i = 1
				while (i <= totalPages && i <= paginationRange) {
						let pageNumber = this.calculatePageNumber(i, currentPage, paginationRange, totalPages)
						let openingEllipsesNeeded = (i === 2 && (position === 'middle' || position === 'end'))
						let closingEllipsesNeeded = (i === paginationRange - 1 && (position === 'middle' || position === 'start'))
						if (ellipsesNeeded && (openingEllipsesNeeded || closingEllipsesNeeded)) {
								pages.push('...')
						} else {
								pages.push(pageNumber)
						}
						i ++
				}
				return pages
		},

		calculatePageNumber (i, currentPage, paginationRange, totalPages) {
			let halfWay = Math.ceil(paginationRange/2)
			if (i === paginationRange) {
					return totalPages
			} else if (i === 1) {
					return i
			} else if (paginationRange < totalPages) {
					if (totalPages - halfWay < currentPage) {
					return totalPages - paginationRange + i
			} else if (halfWay < currentPage) {
					return currentPage - halfWay + i
			} else {
					return i
			}
			} else {
					return i
			}
		}
	},

	watch: {
		source () {
			let x = this.source
			this.pages = this.generatePagesArray(x.current_page, x.total, x.per_page, 12)
		}
	}


}
</script>  