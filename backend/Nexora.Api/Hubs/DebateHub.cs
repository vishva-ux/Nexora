using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;

namespace Nexora.Api.Hubs
{
    public class DebateHub : Hub
    {
        public async Task JoinDebateGroup(string debateId)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, debateId);
        }

        public async Task LeaveDebateGroup(string debateId)
        {
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, debateId);
        }
    }
}
