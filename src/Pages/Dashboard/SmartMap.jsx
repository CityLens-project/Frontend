import { useMemo, useState } from 'react'

import PageHeading from '../../Components/Dashboard/PageHeading'
import MapFilters from '../../Components/SmartMap/MapFilters'
import CityMap from '../../Components/SmartMap/CityMap'
import MapLayers from '../../Components/SmartMap/MapLayers'
import SelectedRoadPanel from '../../Components/SmartMap/SelectedRoadPanel'
import MapLegend from '../../Components/SmartMap/MapLegend'

import {
  roads,
  INITIAL_LAYERS,
} from '../../Data/smartMap'

export default function SmartMap() {
  const [filters, setFilters] = useState({
    district: 'All districts',
    date: 'Today',
    traffic: 'All traffic statuses',
    damage: 'All damage severities',
  })

  const [layers, setLayers] = useState(INITIAL_LAYERS)
  const [selectedRoad, setSelectedRoad] = useState(roads[0])

  const filteredRoads = useMemo(() => {
    return roads.filter((road) => {
      const districtMatch =
        filters.district === 'All districts' ||
        road.district === filters.district

      const trafficMatch =
        filters.traffic === 'All traffic statuses' ||
        road.traffic === filters.traffic

      const damageMatch =
        filters.damage === 'All damage severities' ||
        road.damage === filters.damage

      return districtMatch && trafficMatch && damageMatch
    })
  }, [filters])

  const visibleSelectedRoad = filteredRoads.find(
    (road) => road.id === selectedRoad?.id
  )

  const handleFilterChange = (name, value) => {
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleResetFilters = () => {
    setFilters({
      district: 'All districts',
      date: 'Today',
      traffic: 'All traffic statuses',
      damage: 'All damage severities',
    })
  }

  const handleLayerToggle = (layerName) => {
    setLayers((prev) => ({
      ...prev,
      [layerName]: !prev[layerName],
    }))
  }

  const handleRoadSelect = (road) => {
    setSelectedRoad(road)
  }

  return (
    <div className="flex flex-col gap-6">
      <PageHeading
        title="Smart City Map"
        description="A geographical overview of current city conditions. Switch layers on and off to see traffic, road damage, citizen complaints and AI predictions together."
      />

      <MapFilters
        filters={filters}
        onFilterChange={handleFilterChange}
        onReset={handleResetFilters}
      />

      <section className="grid min-w-0 gap-5 xl:grid-cols-[minmax(0,1.8fr)_minmax(280px,0.75fr)]">
        <CityMap
          roads={filteredRoads}
          layers={layers}
          selectedRoad={visibleSelectedRoad}
          onRoadSelect={handleRoadSelect}
        />

        <div className="flex flex-col gap-5">
          <MapLayers
            layers={layers}
            onToggle={handleLayerToggle}
          />

          <SelectedRoadPanel
            road={visibleSelectedRoad}
            onClose={() => setSelectedRoad(null)}
          />
        </div>
      </section>

      <MapLegend />
    </div>
  )
}
