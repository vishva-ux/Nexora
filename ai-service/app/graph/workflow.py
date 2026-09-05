from langgraph.graph import StateGraph, END
from app.graph.state import WorkflowState
from app.graph.nodes import (
    node_classify_query,
    node_parallel_analysis,
    node_cross_critique,
    node_debate,
    node_consensus_judge
)

def build_nexora_workflow():
    workflow = StateGraph(WorkflowState)
    
    workflow.add_node("classify", node_classify_query)
    workflow.add_node("parallel_analysis", node_parallel_analysis)
    workflow.add_node("cross_critique", node_cross_critique)
    workflow.add_node("debate", node_debate)
    workflow.add_node("consensus_judge", node_consensus_judge)
    
    workflow.set_entry_point("classify")
    
    workflow.add_edge("classify", "parallel_analysis")
    workflow.add_edge("parallel_analysis", "cross_critique")
    workflow.add_edge("cross_critique", "debate")
    workflow.add_edge("debate", "consensus_judge")
    workflow.add_edge("consensus_judge", END)
    
    return workflow.compile()
