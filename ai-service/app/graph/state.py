from typing import TypedDict, List, Dict, Any, Optional

class WorkflowState(TypedDict):
    session_id: str
    question: str
    context: Optional[str]
    opinions: List[Dict[str, Any]]
    critiques: List[Dict[str, Any]]
    debate_messages: List[Dict[str, Any]]
    evidence: List[str]
    disagreements: List[Dict[str, Any]]
    consensus: Optional[Dict[str, Any]]
    status: str
    logs: List[str]
