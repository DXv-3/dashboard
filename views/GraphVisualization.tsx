
import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { GraphData, GraphNode, GraphLink } from '../types';

interface GraphVisualizationProps {
  data: GraphData;
}

const GraphVisualization: React.FC<GraphVisualizationProps> = ({ data }) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current || !data) return;

    const svg = d3.select(svgRef.current);
    const parent = svg.node()?.parentElement;
    if (!parent) return;
    
    const { width, height } = parent.getBoundingClientRect();
    svg.attr('width', width).attr('height', height);

    // Clear previous graph
    svg.selectAll('*').remove();

    if (data.nodes.length === 0) {
        svg.append('text')
           .attr('x', width / 2)
           .attr('y', height / 2)
           .attr('text-anchor', 'middle')
           .attr('fill', '#4a4a4a')
           .style('font-size', '16px')
           .text('Graph will appear here after a query.');
        return;
    }

    const g = svg.append('g');

    const simulation = d3
      .forceSimulation<GraphNode>(data.nodes)
      .force('link', d3.forceLink<GraphNode, GraphLink>(data.links).id((d) => d.id).distance(100))
      .force('charge', d3.forceManyBody().strength(-200))
      .force('center', d3.forceCenter(width / 2, height / 2));

    const link = g
      .append('g')
      .attr('stroke', '#4a4a4a')
      .attr('stroke-opacity', 0.6)
      .selectAll('line')
      .data(data.links)
      .join('line')
      .attr('stroke-width', 1.5);

    const node = g
      .append('g')
      .selectAll('g')
      .data(data.nodes)
      .join('g')
      .call(drag(simulation));

    const color = (d: GraphNode) => {
        switch(d.type) {
            case 'entity': return '#00aaff'; // primary
            case 'concept': return '#ff4081'; // secondary
            case 'document': return '#4caf50'; // green
            default: return '#9a9a9a';
        }
    }
      
    node.append('circle')
      .attr('r', 15)
      .attr('fill', color)
      .attr('stroke', '#121212')
      .attr('stroke-width', 2);

    node.append('text')
      .text((d) => d.label)
      .attr('x', 20)
      .attr('y', 5)
      .attr('fill', '#e0e0e0')
      .style('font-size', '12px');

    simulation.on('tick', () => {
      link
        .attr('x1', (d) => (d.source as GraphNode).x!)
        .attr('y1', (d) => (d.source as GraphNode).y!)
        .attr('x2', (d) => (d.target as GraphNode).x!)
        .attr('y2', (d) => (d.target as GraphNode).y!);

      node.attr('transform', (d) => `translate(${d.x},${d.y})`);
    });

    // Zoom functionality
    const zoom = d3.zoom<SVGSVGElement, unknown>().on('zoom', (event) => {
        g.attr('transform', event.transform);
    });

    svg.call(zoom as any);

    function drag(simulation: d3.Simulation<GraphNode, undefined>) {
        function dragstarted(event: d3.D3DragEvent<Element, GraphNode, GraphNode>, d: GraphNode) {
            if (!event.active) simulation.alphaTarget(0.3).restart();
            d.fx = d.x;
            d.fy = d.y;
        }

        function dragged(event: d3.D3DragEvent<Element, GraphNode, GraphNode>, d: GraphNode) {
            d.fx = event.x;
            d.fy = event.y;
        }

        function dragended(event: d3.D3DragEvent<Element, GraphNode, GraphNode>, d: GraphNode) {
            if (!event.active) simulation.alphaTarget(0);
            d.fx = null;
            d.fy = null;
        }

        return d3.drag<Element, GraphNode>()
            .on('start', dragstarted)
            .on('drag', dragged)
            .on('end', dragended);
    }
     
    return () => {
        simulation.stop();
    };

  }, [data]);

  return <svg ref={svgRef} className="w-full h-full"></svg>;
};

export default GraphVisualization;
