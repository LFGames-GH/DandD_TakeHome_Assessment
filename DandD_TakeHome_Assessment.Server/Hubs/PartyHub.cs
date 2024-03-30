using Microsoft.AspNetCore.SignalR;

namespace DandD_TakeHome_Assessment.Server.Hubs
{
    public class PartyHub : Hub
    {
        public async Task SendUpdate(string message)
        {
            await Clients.All.SendAsync("ReceiveUpdate", message);
        }
    }
}
