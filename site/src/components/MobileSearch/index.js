import './style.scss';

import React, { Fragment } from 'react';
import DebounceInput from 'react-debounce-input';
import { withRouter } from 'react-router-dom';
import _ from 'lodash';
import arrify from 'arrify';
import useMedia from 'use-media';
import { FilterTagList, FilterTag } from '../FilterTag';


import { ReactComponent as FilterIcon } from '../../assets/filter.svg';
import FilterDrawer from '../FilterDrawer';

import { ReactComponent as SearchIcon } from '../../assets/search-icon.svg';
import { breakpoints } from '../../CONSTANTS';
import Card from '../Card';
import useToggle from '../../utils/useToggle';
import getActiveFilters from '../../utils/getActiveFilters';

function MobileSearch ({ query, onChange, location, history, match }) {
    const [isFilterDrawerOpen, toggleFilterDrawer] = useToggle(false);

    const mq = {
        md: useMedia({ minWidth: breakpoints.md })
    };

    function handleFocus (e) {
        requestAnimationFrame(() => {
            document.getElementById('root').scrollTop = 0;
        });
    }

    function handleTermChange (e) {
        onChange({
            ...query,
            term: e.target.value
        });
    }

    const activeFilters = getActiveFilters(query);

    const filtersTags = _.flatMap(activeFilters, (values, type) => {
        return _.map(arrify(values), (value) => ({ type, value }));
    });

    function handleRemoveTag (type, value) {
        const nextQuery = {
            ...query,
            [type]:  _.without(query[type], value)
        };

        onChange(nextQuery);
    }

    return (
        <div className="MobileSearch">
            <div className="MobileSearch-search-group">
                <div className="MobileSearch-term">
                    <SearchIcon className="MobileSearch-term-icon" />
                    <DebounceInput
                        className="MobileSearch-term-input"
                        debounceTimeout={250}
                        name="term"
                        value={query.term}
                        onFocus={handleFocus}
                        onChange={handleTermChange}
                        placeholder="חיפוש אירועים..."
                        autoComplete="off"
                    />
                </div>
                <Fragment>
                    <div className="MobileSearch-filter" onClick={toggleFilterDrawer}>
                        <span className="MobileSearch-filter-iconwrap">
                            <FilterIcon className="MobileSearch-filter-icon" />
                            {!!_.size(getActiveFilters(query, { excludeTerm: true })) && (
                                <span className="MobileSearch-filter-badge">
                                    {_.size(activeFilters)}
                                </span>
                            )}
                        </span>
                        <span>סינון</span>
                    </div>
                    {isFilterDrawerOpen && (
                        <FilterDrawer
                            query={query}
                            onSubmit={(nextQuery) => {
                                console.log('nextQuery', nextQuery);
                                onChange(nextQuery);
                            }}
                            onClose={toggleFilterDrawer}
                        />
                    )}
                </Fragment>
            </div>
            <FilterTagList>
                {_.map(filtersTags, ({ type, value }) => (
                    <FilterTag
                        key={type + value}
                        type={type}
                        value={value}
                        onClick={() => handleRemoveTag(type, value)}
                    />
                ))}
            </FilterTagList>
        </div>
    );
}

export default withRouter(MobileSearch);