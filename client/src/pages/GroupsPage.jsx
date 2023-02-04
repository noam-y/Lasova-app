import { useState, useEffect, useRef, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { loadGroups, searchGroups } from '../store/actions/groupActions';
import BasePage from './BasePage';
import BaseTable from '../components/BaseTable';
import FilterableHeaderCell from '../components/FilterableHeaderCell';
import NewGroupModal from '../components/NewGroup';
import EditGroupModal from '../components/EditGroup';

const GroupsPage = () => {
  const [isNewGroupModalOpen, setGroupModal] = useState(false);
  const [isEditGroupModalOpen, setEditGroupModal] = useState(false);
  const [groupToShow, setGroupToShow] = useState({});
  const exportRef = useRef(null);
  const csvBtnRef = useRef(null);

  const openEditGroup = (group) => {
    setEditGroupModal(true);
    setGroupToShow(group);
  };

  const dispatch = useDispatch();
  const { groups, groupsToShow } = useSelector((state) => state.groupReducer);

  useEffect(() => {
    dispatch(loadGroups());
  }, [dispatch, isEditGroupModalOpen, isNewGroupModalOpen]);

  const [dropdownPosition, setDropdownPosition] = useState(null);
  const [activeFilter, setActiveFilter] = useState('');
  const [filter, setFilter] = useState({
    groupType: '',
  });
  const filterOptions = useMemo(() => {
    if (!groups) return {};
    const retval = groups.reduce((acc, curr) => {
      Object.keys(filter).forEach((key) => {
        acc[key].add(curr[key]);
      });
      return acc;
    }, createInitialFilterOptions());
    Object.keys(retval).forEach((key) => {
      retval[key] = Array.from(retval[key]);
    });
    return retval;
  }, [createInitialFilterOptions, filter, groups]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  function createInitialFilterOptions() {
    const retval = {};
    Object.keys(filter).forEach((key) => {
      retval[key] = new Set();
      retval[key].add('בחר הכל');
    });
    return retval;
  }

  const onSetFilter = (filterBy) => {
    setFilter({
      ...filter,
      [activeFilter]: filterBy,
    });
    setActiveFilter('');
  };

  const getFilterableHeaderCellProps = (name, title) => {
    return {
      title,
      onToggleDropdown: ({ bottom, left }) => {
        setDropdownPosition({ top: bottom, left });
        activeFilter === name ? setActiveFilter('') : setActiveFilter(name);
      },
    };
  };

  const columns = useMemo(
    () => [
      {
        field: 'type',
        description: 'סוג קבוצה',
        headerName: 'סוג קבוצה',
        flex:1,
        valueGetter: (params) => params.row.type || '',
        renderHeader: () => <FilterableHeaderCell {...getFilterableHeaderCellProps('type', 'סוג קבוצה')} />,
      },
      {
        field: 'name',
        headerName: 'שם הארגון',
        description: 'שם הארגון',
        flex:1,
        valueGetter: (params) => params.row.name || '',
      },
      {
        field: 'contactNane',
        headerName: 'איש קשר',
        description: 'איש קשר',
        flex:1,
        valueGetter: (params) => params.row.contactName || '',
      },
      {
        field: 'contactRole',
        headerName: 'תפקיד',
        description: 'תפקיד',
        flex:1,
        valueGetter: (params) => params.row.contactRole || '',
      },
      {
        field: 'cellphone',
        headerName: 'טלפון',
        description: 'טלפון',
        flex:1,
        valueGetter: (params) => params.row.contactCellphone || '',
      },
      {
        field: 'volunteersCount',
        headerName: 'מספר מתנדבים',
        description: 'מספר מתנדבים',
        flex:1,
        valueGetter: (params) => params.row.volunteersCount || '',
      },
      {
        field: 'reportedHours',
        headerName: 'סהכ שעות התנדבות',
        description: 'סהכ שעות התנדבות',
        flex:1,
        valueGetter: (params) => params.row.reportedHours || '',
      },
      {
        field: 'volunteeringsCount',
        headerName: 'סהכ התנדבויות ',
        description: 'סהכ התנדבויות',
        flex:1,
        valueGetter: (params) => params.row.volunteeringsCount || '',
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [filterOptions, filter, dropdownPosition]
  );

  return (
    <BasePage
      title="טבלת קבוצות וארגונים"
      doExport={() => exportRef.current()}
      doSearch={(searchText) => dispatch(searchGroups(searchText))}
      onAdd={() => setGroupModal(true)}
    >
      <BaseTable
        entities={groupsToShow}
        columns={columns}
        // rows={groupsToShow}
        exportRef={exportRef}
        csvBtnRef={csvBtnRef}
        exportFileName="לשובע-קבוצות-וארגונים"
        activeFilter={activeFilter}
        dropdownPosition={dropdownPosition}
        filterOptions={filterOptions}
        onSetFilter={onSetFilter}
        filter={filter}
        onEntityClick={openEditGroup}
      />
      {isNewGroupModalOpen && <NewGroupModal open={isNewGroupModalOpen} setOpen={setGroupModal} />}
      {isEditGroupModalOpen && (
        <EditGroupModal open={isEditGroupModalOpen} setOpen={setEditGroupModal} group={groupToShow} />
      )}
    </BasePage>
  );
};

export default GroupsPage;
