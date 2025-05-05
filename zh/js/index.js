/**
 * Complete the functions below, then run `npm run test` in the root directory to check your work.
 * 
 * For more details on expected input and output, check the tests.
 * If all tests are green, you are done! Keep in mind that the actual implementation will be also reviewed.
 * 
 * (don't forget about the html/css task in ../html-css!)
 * 
 * If you find a buggy test, feel free to report (and/or fix) it.
 *
 * ========================================================================================================
 * */
/**
 * Creates a simple object for HTTP headers based on the input.
 * 
 * The input is in the following format:
 * [
 *  [<Header-Name>, <header-value1>, <header-value2?>, ...],
 *  ...
 * ]
 * 
 * Expected output: {
 *  <header-name>: '<header-value1>, <header-value2>, ...'
 * }
 * 
 */

module.exports.createHttpHeaders = (input) => {
    const headers = {};
    
    if (Array.isArray(input) && input.length > 0) {
        input.forEach(item => {
        
            if (Array.isArray(item) && item.length >= 2) {
                const [headerName, ...headerValues] = item;
                const lowerCaseHeaderName = headerName.toLowerCase();
                
                
                const joinedValues = headerValues.filter(Boolean).join(', ');
                
                if (headers[lowerCaseHeaderName]) {
                    headers[lowerCaseHeaderName] += `, ${joinedValues}`;
                } else {
                    headers[lowerCaseHeaderName] = joinedValues;
                }
            }
        });
    }

    return headers;
}

/**
 * Returns items for a paginated list.
 * 
 * The input is in the following format:
 * items: [
 *  { id: 1, title: '<main>item 1</main>', displayTitle: 'Item 1', metadata: {} },
 * ]
 * 
 * params: {
 *  page: 1,
 *  pageSize: 4,
 *  sort: 'asc',
 * }
 * 
 * Expected output:
 * [
 *  { id: 1, title: { main: 'Item 1' }  }
 * ]
 */
module.exports.getItems = (items, params) => {
    const { page, pageSize, sort } = params;

    const sortedItems = items.sort((a, b) => {
        if (sort === 'asc') {
            return a.id - b.id;
        } else if (sort === 'desc') {
            return b.id - a.id;
        }
        return 0; 
    });

    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    const paginatedItems = sortedItems.slice(startIndex, endIndex);

    const transformedItems = paginatedItems.map(item => {
        return {
            id: item.id,
            title: { main: item.displayTitle }
        };
    });

    return transformedItems;
}
