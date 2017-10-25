// @flow

import React from 'react'
import styled from 'styled-components/native'
import { Dimensions } from 'react-native'
import { memoize } from 'lodash'

import NewColumn from './NewColumn'
import ImmutableVirtualizedList from '../../libs/immutable-virtualized-list'
import { getColumnWidth, getColumnContentWidth } from './_Column'
import type { ActionCreators } from '../../utils/types'

export const StyledImmutableVirtualizedListListView = styled(
  ImmutableVirtualizedList,
)`
  flex: 1;
`

export default class Columns extends React.PureComponent {
  props: {
    actions: ActionCreators,
    createColumnFn?: ?Function,
    items: Array<any>,
    radius?: number,
    renderItem: Function,
    width?: number,
  }

  makeRenderItem = memoize(
    mainRenderItem => ({ index, item }, ...otherArgs) => {
      if (!item) return null

      if (item === 'new') return this.renderNewColumn(index)
      return mainRenderItem({ index, item }, ...otherArgs)
    },
  )

  renderNewColumn(order) {
    const { actions, createColumnFn, radius, width } = this.props

    if (!createColumnFn) return null

    return (
      <NewColumn
        createColumnFn={createColumnFn}
        createColumnOrder={order}
        actions={actions}
        radius={radius}
        width={width || getColumnContentWidth()}
      />
    )
  }

  render() {
    const { items, renderItem: mainRenderItem, ...props } = this.props

    const initialNumToRender = Math.max(
      1,
      Math.ceil(Dimensions.get('window').width / getColumnWidth()),
    )

    return (
      <StyledImmutableVirtualizedListListView
        immutableData={items}
        initialNumToRender={initialNumToRender}
        renderItem={this.makeRenderItem(mainRenderItem)}
        removeClippedSubviews
        horizontal
        pagingEnabled
        {...props}
      />
    )
  }
}
